import task from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const addTask = asyncHandler(async (req, res, next) => {
    const {heading, description, program_id, skill} = req.body;
    if([heading, description, program_id, skill].some((field) => field?.trim() === "")){
        throw new ApiError(401, "All fields are required");
    }

    const existedtask = await task.findOne({
        $or: {heading}
    });

    if(existedtask){
        throw new ApiError(401, "Task already exists");
    }

    const skills= skill.split(",");

    const newTask = await task.create({
        heading,
        description, 
        program_id,
        skills
    })

    const createdTask= await task.findById(newTask._id);

    if(!createdTask){
        throw new ApiError(400, "Error on creating Task");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, createdTask, "Task created successfully"));

});

const taskbyId = asyncHandler(async (req, res, next) => {
    const task_id=req.body;

    if(!task_id){
        throw new ApiError(401, "Task id is required");
    }

    const Task= await task.findById(task_id);

    if(!Task){
        throw new ApiError(404, "Task not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, Task, "Task fetched successfully"));
})

const allTasks = asyncHandler(async (req, res, next) => {
    const Tasks= await task.find();

    return res 
    .status(200)
    .json(new ApiResponse(200, Tasks, "Tasks fetched successfully"));
})

const allTaskbyprogramId= asyncHandler(async (req, res, next) => {
    const program_id= req.body;
    const existedtask = await task.findOne({
        $or: {program_id}
    });

    if(!existedtask){
        throw new ApiError(404, "Task not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, existedtask, "Task fetched successfully"));

})
const deleteTask = asyncHandler(async (req, res, next) => {
    const Task_id= req.body;

    if(!Task_id){
        throw new ApiError(401, "Task id is required");
    }

    const result = await task.deleteOne({
        _id: Task_id,
      });
    
    if (result.deletedCount === 0) {
        throw new ApiError(404, "Task not found");
      }
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));

})

const updateTask= asyncHandler(async (req, res, next) => {
    const {Task_id, heading, description, skill} = req.body;

    const skills=skill.split(",");

    const updatedtask = task.findByIdAndUpdate(
        Task_id,
        {
            heading,
            description,
            skills
        },
        {
            new: true
        }
    )

    if(!updatedtask){
        throw new ApiError(404, "Task not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, updatedtask, "Task updated successfully"));

})


export {
    addTask,
    taskbyId,
    allTasks,
    allTaskbyprogramId,
    deleteTask,
    updateTask
}