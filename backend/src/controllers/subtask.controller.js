import subtask from "../models/subtask.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addsubTask = asyncHandler(async (req, res, next) => {
    const {heading, description, task_id} = req.body;
    if([heading, description, task_id].some((field) => field?.trim() === "")){
        throw new ApiError(401, "All fields are required");
    }

    const existedsubtask = await subtask.findOne({
        $or: {heading}
    });

    if(existedsubtask){
        throw new ApiError(401, "SubTask already exists");
    }
    const solutionLocalPath = req.file?.solution[0]?.path;

    if(!solutionLocalPath){
        throw new ApiError(400, "Profile picture is required");
    }

    const solution= await uploadOnCloudinary(solutionLocalPath);

    if(!avatar){
        throw new ApiError(400, "Something went wrong");
    }
    const newsubTask = await subtask.create({
        heading,
        description, 
        task_id,
        solutiongiven :solution.secure_url
    })

    const createdsubTask= await subtask.findById(newsubTask._id);

    if(!createdsubTask){
        throw new ApiError(400, "Error on creating SubTask");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, createdsubTask, "SubTask created successfully"));

});

const subtaskbyId = asyncHandler(async (req, res, next) => {
    const subtask_id=req.body;

    if(!subtask_id){
        throw new ApiError(401, "Task id is required");
    }

    const subTask= await subtask.findById(subtask_id);

    if(!subTask){
        throw new ApiError(404, "SubTask not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, subTask, "SubTask fetched successfully"));
})

const allsubTasks = asyncHandler(async (req, res, next) => {
    const subTasks= await subtask.find();

    return res 
    .status(200)
    .json(new ApiResponse(200, subTasks, "Tasks fetched successfully"));
})

const allsubTaskbytaskId= asyncHandler(async (req, res, next) => {
    const task_id= req.body;
    const existedsubtask = await subtask.findOne({
        $or: {task_id}
    });

    if(!existedsubtask){
        throw new ApiError(404, "SubTask not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, existedsubtask, "SubTask fetched successfully"));

})
const deletesubTask = asyncHandler(async (req, res, next) => {
    const subTask_id= req.body;

    if(!subTask_id){
        throw new ApiError(401, "SubTask id is required");
    }

    const result = await subtask.deleteOne({
        _id: subTask_id,
      });
    
    if (result.deletedCount === 0) {
        throw new ApiError(404, "SubTask not found");
      }
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "SubTask deleted successfully"));

})

const updatesubTask= asyncHandler(async (req, res, next) => {
    const {subTask_id, heading, description} = req.body;


    const updatedsubtask = task.findByIdAndUpdate(
        subTask_id,
        {
            heading,
            description
        },
        {
            new: true
        }
    )

    if(!updatedsubtask){
        throw new ApiError(404, "Task not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, updatedsubtask, "Task updated successfully"));

})

const updateSolution= asyncHandler(async (req, res, next) => {

    const {subTask_id} = req.body;
    const updateLocalpath= req.file?.solution[0]?.path;

    if(!updateLocalpath){
        throw new ApiError(400, "Profile picture is required");
    }

    const solution= await uploadOnCloudinary(updateLocalpath);

    if(!solution?.url){
        throw new ApiError(400, "Error on Uploading avatar");
    }

    const  Subtask= subtask.findByIdAndUpdate(
        subTask_id,
        {
            $set:{
                solutiongiven: solution.url
            }
        },
        {new: true}
    );

    return res
    .status(200)
    .json(new ApiResponse(200, Subtask, "Solution updated successfully"))
})


export {
    registersubTask,
    subtaskbyId,
    allsubTasks,
    allsubTaskbytaskId,
    deletesubTask,
    updatesubTask,
    updateSolution
}