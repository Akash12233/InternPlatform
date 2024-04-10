import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import program from "../models/program.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProgram = asyncHandler(async (req, res, next) => {
    const {heading,shortDescription ,description, duration, price, keywords, skills} =req.body;

    if([heading,shortDescription ,description, duration, price, keywords, skills].some((field) => field?.trim() === "")
    ){
        throw new ApiError (401,"All fields are required");
    }

    const existedProgram = await program.findOne({
        heading: heading
    });

    if(existedProgram){
        return res.status(401).json( new ApiError(401,null ,"Program already exists"));
    }

    const imageLocalPath = req.file?.image[0]?.path;

    if(!imageLocalPath){
        throw new ApiError(400, "Profile picture is required");
    }

    const image= await uploadOnCloudinary(imageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Something went wrong");
    }
    let programs = await program.find({});
    let id;
    if(programs.length>0){
        let last_program = programs.slice(-1);
        let last = last_program[0];
        id = last.id + 1
    }
    else{
        id = 1;
    }

    let keyword= keywords.split(",");
    keyword = keyword.filter((el) => el !== "");
    let skill= skills.split(",");
    skill = skill.filter((el) => el !== "");
 console.log(keyword,skill);
    const newProgram = await program.create({
        id,
        heading,
        shortDescription,
        description, 
        duration, 
        price, 
        keywords: keyword, 
        skills: skill,
        image:image.secure_url
    })

    const createdprogram= await program.findById(newProgram._id);

    if(!createdprogram){
        return res.status(400).json( new ApiResponse(400,null, "Error on creating Program"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200, createdprogram, "Program created successfully"))

})



const programbyId = asyncHandler(async (req, res, next) => {
    const {id} = req.body;
    console.log(id);
    if(!id){
        return new ApiError(401, "Program id is required");
    }

        const Program= await program.findById(id);
        if(!Program){
            return res.status(404).json( new ApiResponse(404, "Program not found"));
        }
        else{
            return res 
            .status(200)
            .json(new ApiResponse(200, Program, "Program fetched successfully"));

        }
    
   

    
})

const allprograms = asyncHandler(async (req, res, next) => {
    const programs= await program.find();

    return res 
    .status(200)
    .json(new ApiResponse(200, programs, "Programs fetched successfully"));
})

const deleteprogram = asyncHandler(async (req, res, next) => {
    const {program_id}= req.body;

    if(!program_id){
        throw new ApiError(401, "Program id is required");
    }

    const result = await program.deleteOne({
        id: program_id,
      });
    
    if (result.deletedCount === 0) {
        throw new ApiError(404, "Program not found");
      }
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Program deleted successfully"));

})



const updatedProgram= asyncHandler(async (req, res, next) => {
    const {program_id, heading,shortDescription ,description, duration, price, keyword, skill} = req.body;
    const keywords=keyword.split(",");
    const skills=skill.split(",");

    const updatedprogram = await program.findByIdAndUpdate(
         program_id,
        {
            heading,
            shortDescription,
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

const getprogramdone = asyncHandler(async (req, res, next) => {
    const program_id= req.body;
    if(mongoose.Types.ObjectId.isValid(program_id)){
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
    }
    else{
        return res.status(404).json( new ApiResponse(404,"objectid is not valid"));
    }
   

})


export {
    addProgram,

    programbyId,
    allprograms,
    deleteprogram,
  
    updatedProgram,
    getprogramdone
}