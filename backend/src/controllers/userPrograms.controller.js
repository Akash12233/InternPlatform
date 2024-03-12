import {ApiError} from "../utils/ApiError.js"

import userProgramsModel from "../models/userPrograms.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProgramUser = asyncHandler(async (req, res, next) => {
    const {user_id, program_id} = req.body;
    const existedProgram = await userProgramsModel.findOne({
        $and: {program_id, user_id}
    });
    if(existedProgram){
        return res.status(401).json(new ApiResponse(401, null, "Program already enrolled"));
    
    }
    else{
        if(mongoose.Types.ObjectId.isValid(user_id) && mongoose.Types.ObjectId.isValid(program_id)){
                const newProgram = await userProgramsModel.create({
                    user_id,
                    program_id
                });
        
                return res.status(200).json(new ApiResponse(200, newProgram, "Program enrolled successfully"));
            }
            else{
                return res.status(401).json(new ApiResponse(401, null, "User id and Program id is required"));
               
            }
            
        }
        

})

 const getProgramsByUser = asyncHandler(async (req, res, next) => {
    const {user_id} = req.body;
    if(mongoose.Types.ObjectId.isValid(user_id)){
        const programs = await userProgramsModel.find({
            user_id
        })
        return res.status(200).json(new ApiResponse(200, programs, "Programs fetched successfully"));

    }
    else{
        return res.status(401).json(new ApiResponse(401, null, "User id is required"));
  
    }
})

 const getProgramsByProgram = asyncHandler(async (req, res, next) => {
    const {program_id} = req.body;
    if(mongoose.Types.ObjectId.isValid(program_id)){
        
        const programs = await userProgramsModel.find({
            program_id
        })
        return res.status(200).json(new ApiResponse(200, programs, "Programs fetched successfully"));
    }
    else{
        return res.status(401).json(new ApiResponse(401, null, "Program id is required"));
   
    }
})

 const deleteProgramUser = asyncHandler(async (req, res, next) => {
    const {user_id, program_id} = req.body;
    if(mongoose.Types.ObjectId.isValid(user_id) && mongoose.Types.ObjectId.isValid(program_id)){
        const result = await userProgramsModel.deleteOne({
            $and: {program_id, user_id}
        });
        return res.status(200).json(new ApiResponse(200, result, "Program deleted successfully"));
    }
    else{
        return res.status(401).json(new ApiResponse(401, null, "User id and Program id is required"));
        
    }
})

export  {addProgramUser,getProgramsByProgram, getProgramsByUser, deleteProgramUser};

