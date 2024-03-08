import {ApiError} from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import program from "../models/program.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerProgram = asyncHandler(async (req, res, next) => {
    const {heading, description, duration, price, keyword, skill} =req.body;

    if([heading, description, duration, price, keyword, skill].some((field) => field?.trim() === "")
    ){
        throw new ApiError (409,"All fields are required");
    }

    const existedProgram = await program.findOne({
        $or: {heading}
    });

    if(existedProgram){
        throw new ApiError(401, "Program already exists");
    }

    const imageLocalPath = req.file?.image[0]?.path;

    if(!imageLocalPath){
        throw new ApiError(400, "Profile picture is required");
    }

    const image= await uploadOnCloudinary(imageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Something went wrong");
    }

    const keywords= keyword.split(",");
    const skills= skill.split(",");

    const newProgram = await program.create({
        heading,
        description, 
        duration, 
        price, 
        keywords, 
        skills,
        image:image.secure_url
    })

    const createdprogram= await program.findById(newProgram._id);

    if(!createdprogram){
        throw new ApiError(400, "Error on creating Program");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, createdprogram, "Program created successfully"))

})

const addUser = asyncHandler(async (req, res, next) => {
    const {user_id,program_id}= req.body;

    if(!user_id || !program_id){
        throw new ApiError(401, "User id and Program id is required");
    }

    const Program = await program.findById(program_id);

    if(!Program){
        throw new ApiError(404, "Program not found");
    }

    Program.useropt.push(user_id);

    const updatedProgram= await Program.save();

    return res
    .status(200)
    .json(new ApiResponse(200, updatedProgram, "Program updated successfully"));
})

const programbyId = asyncHandler(async (req, res, next) => {
    const {id} = req.body;
    console.log(id);
    if(!id){
        return new ApiError(401, "Program id is required");
    }
    if(mongoose.Types.ObjectId.isValid(id)){
        const Program= await program.findById(id);
        if(!Program){
            return res.status(404).json( new ApiResponse(404, "Program not found"));
        }
        else{
            return res 
            .status(200)
            .json(new ApiResponse(200, Program, "Program fetched successfully"));

        }
    
    }
    else{
        return res.status(404).json( new ApiResponse(404,"objectid is not valid"));
    }

    
})

const allprograms = asyncHandler(async (req, res, next) => {
    const programs= await program.find();

    return res 
    .status(200)
    .json(new ApiResponse(200, programs, "Programs fetched successfully"));
})

const deleteprogram = asyncHandler(async (req, res, next) => {
    const program_id= req.body;

    if(!program_id){
        throw new ApiError(401, "Program id is required");
    }

    const result = await program.deleteOne({
        _id: program_id,
      });
    
    if (result.deletedCount === 0) {
        throw new ApiError(404, "Program not found");
      }
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Program deleted successfully"));

})

const removeUser = asyncHandler(async (req, res, next) => {
    const {user_id, program_id}= req.body;

    if(!user_id || !program_id){
        throw new ApiError(401, "User id and Program id is required");
    }

    const Program= await program.findById(program_id);

    Program.useropt.pull(user_id);

    const updatedProgram= await Program.save();

    return res 
    .status(200)
    .json(new ApiResponse(200, updatedProgram, "Program updated successfully"));

});

const updatedProgram= asyncHandler(async (req, res, next) => {
    const {program_id, heading, description, duration, price, keyword, skill} = req.body;
    const keywords=keyword.split(",");
    const skills=skill.split(",");

    const updatedprogram = await program.findByIdAndUpdate(
        program_id,
        {
            heading,
            description,
            duration,
            price,
            keywords,
            skills
        },
        {
            new: true
        }
    )

    if(!updatedprogram){
        throw new ApiError(404, "Program not found");
    }
    return res 
    .status(200)
    .json(new ApiResponse(200, updatedprogram, "Program updated successfully"));
})

const getprogramdone= asyncHandler(async (req, res, next) => {
    const program_id= req.body;

    const programdone = await program.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(program_id)
            }
        },
        {
            $lookup:{
                from: "useractions",
                localField: "_id",
                foreignField: "program_id",
                as: "useractions"
            }
        },
        {
            $addFields: {
                allcontent: {
                    $size: {$filter: {
                            input: "$useractions",
                            as: "useraction",
                            cond: {
                                 $eq: ["$$useraction.user_id", user_id] 
                            }
                        }
                    }
                },
                allcontentVerified: {
                    $size: {
                        $filter: {
                          input: "$subtasks",
                          as: "useraction",
                          cond: {
                            $and: [
                              { $eq: ["$$useraction.verified", true] }, // First condition
                              { $eq: ["$$useraction.user_id", user_id] }
                            ]
                          }
                        }
                    }
                }
            }
        },
        {
            $project:{
                _id:1,
                heading:1,
                allcontent:1,
                allcontentVerified:1,
            }
        }
    ])

    if(!programdone?.length){
        throw new ApiError(404, "Program not found");
    }
    return res 
    .status(200)
    .json(new ApiResponse(200, programdone[0], "Program done successfully"));

})


export {
    registerProgram,
    addUser,
    programbyId,
    allprograms,
    deleteprogram,
    removeUser,
    updatedProgram,
    getprogramdone
}