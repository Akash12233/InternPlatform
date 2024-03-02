import useraction from "../models/useraction.model";
import {ApiError} from "../utils/ApiError.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import task from "../models/task.model.js";
import subtask from "../models/subtask.model.js";


const addUseraction = asyncHandler(async (req, res, next) => {
    const { program_id } = req.body;
    const user_id = req.user._id;

    if (!program_id) {
        throw new ApiError(401, "Program id is required");
    }

    const tasks = await task.find({ program_id });

    if (tasks.length === 0) {
        throw new ApiError(404, "Tasks not found");
    }

    await Promise.all(tasks.map(async (task) => {
        const subtasks = await subtask.find({ task_id: task._id });

        if (subtasks.length === 0) {
            throw new ApiError(404, "Subtasks not found");
        }

        await Promise.all(subtasks.map(async (subtask) => {
            const bool = await useraction.adduseraction(user_id, program_id, task._id, subtask._id);

            if (!bool) {
                throw new ApiError(401, "User action not added");
            }
        }));
    }));

    return res.status(200).json(new ApiResponse(200, {}, "User action added successfully"));
});


const addsolution = asyncHandler(async (req, res, next) => {
    const { program_id, task_id, subtask_id} = req.body;
    if(!solution){
        throw new ApiError(401, "Solution is required");
    }

    const addeduseraction = await useraction.findOne({
        user_id: req.user._id,
        program_id: program_id,
        task_id: task_id,
        subtask_id: subtask_id, 
    });

    if(!addeduseraction){
        throw new ApiError(401, "User action not found");
    }

    const solutionLocalPath = req.file?.solution[0]?.path;

    if(!solutionLocalPath){
        throw new ApiError(400, "Solution is required");
    }

    const solution= await uploadOnCloudinary(solutionLocalPath);

    if(!solution){
        throw new ApiError(400, "Something went wrong");
    }

    addeduseraction.solutionsubmitted = solution.url;
    addeduseraction.status = true;
    const updatedUseraction = await addeduseraction.save();

    if(!updatedUseraction){
        throw new ApiError(401, "User action not updated");
    }

});

const getuseraction= asyncHandler(async (req, res, next) => {
    const { program_id, task_id, subtask_id} = req.body;

    if(!program_id, task_id, subtask_id){
        throw new ApiError(401, "User action not found");
    }

    const useraction = await useraction.findOne({
        user_id: req.user._id,
        program_id: program_id,
        task_id: task_id,
        subtask_id: subtask_id,
    })

    if(!useraction){
        throw new ApiError(401, "User action not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, useraction, "User action fetched successfully"));
})

const verifyingsolution = asyncHandler(async (req, res, next) => {
    const {user_id, program_id, task_id, subtask_id,verify, comment} = req.body;

    if (!program_id || !task_id || !subtask_id || !comment || !verify) {
        throw new ApiError(401, "Fields are required");
    }
    const userAction = await useraction.findOne({
        user_id: req.user_id,
        program_id: program_id,
        task_id: task_id,
        subtask_id: subtask_id,
    })

    if(!userAction){
        throw new ApiError(401, "User action not found");
    }

    if(verify="verifed"){
    
        userAction.verified = true;
        userAction.comment = comment;
        const updatedUseraction = await useraction.save();
    
        if(!updatedUseraction){
            throw new ApiError(401, "User action not updated");
        }
    }
    else{
        userAction.verified = false;
        userAction.comment = comment;
        const updatedUseraction = await useraction.save();
        if(!updatedUseraction){
            throw new ApiError(401, "User action not updated");
        }
    }

    return res 
    .status(200)
    .json(new ApiResponse(200,{}, "User action updated successfully"));

});

export default {
    addUseraction,
    addsolution,
    getuseraction,
    verifyingsolution
}