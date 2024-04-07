import task from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const addTask = asyncHandler(async (req, res, next) => {
    const {heading, description, program_id, skill} = req.body;
   console.log(req.body);
    if([heading, description, program_id, skill].some((field) => field?.trim() === "")){
        throw new ApiError(401, "All fields are required");
    }

    const existedtask = await task.findOne({
        heading: heading
    });

    if(existedtask){
        return res.status(401).json( new ApiError(401,null ,"Task already exists"));
    }

    let skills= skill.split(",");
    console.log(skills);
    skills = skills.filter((el)=> el !== "");
    console.log(skills);

    let tasks = await task.find({});
    let id;
    if(tasks.length>0){
        let last_task = tasks.slice(-1);
        let last = last_task[0];
        id = last.id + 1
    }
    else{
        id = 1
    }
    const newTask = await task.create({
        id,
        heading,
        description, 
        program_id: Number(program_id),
        skills: skills
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
  console.log(req.body);
    const {program_id}= req.body;
    console.log(program_id);
    const existedtask = await task.findOne({
        $or: [
            {
                program_id:program_id
            }
        ]
    }); 

    if(!existedtask){
        throw new ApiError(404, "Task not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, existedtask, "Task fetched successfully"));

})
const deleteTask = asyncHandler(async (req, res, next) => {
    const {Task_id}= req.body;

    if(!Task_id){ 
        return res.status(401).json( new ApiError(401,null ,"Task id is required"));
    }
    console.log(Task_id);
    const result = await task.deleteOne({
        id: Task_id,
      });
    
    if (result.deletedCount === 0) {
        return res.status(404).json( new ApiError(404, "Task not found"));
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

});

const gettaskdone = asyncHandler(async (req, res, next) => {
    const {task_id,program_id}= req.body;
    const user_id= req.user._id;
    const taskDone =await task.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(task_id)
          }
        },
        // Lookup subtasks associated with each task
        {
          $lookup: {
            from: "useractions", 
            localField: "_id",
            foreignField: "task_id",
            as: "subtasks"
          }
        },
        {
            $addFields: {
                allsubtaks: {
                    $size: {$filter: {
                            input: "$subtasks",
                            as: "useraction",
                            cond: {
                            $and: [
                                { $eq: ["$$useraction.user_id", user_id] },
                                { $eq: ["$$useraction.program_id", program_id] } 
                            ]
                            }
                        }
                    }
                },
                allSubtasksVerified: {
                    $size: {
                        $filter: {
                          input: "$subtasks",
                          as: "useraction",
                          cond: {
                            $and: [
                              { $eq: ["$$useraction.verified", true] }, // First condition
                              { $eq: ["$$useraction.user_id", user_id] },
                              { $eq: ["$$useraction.program_id", program_id] } 
                            ]
                          }
                        }
                    }
                }
            }
        },
        {
          $project: {
            _id: 1,
            heading: 1,
            allsubtaks: 1,
            allSubtasksVerified: 1
          }
        },
      ]);
      
      console.log(taskDone);

      if(!taskDone?.length){
        throw new ApiError(404, "Task not found");
      }

      return res 
      .status(200)
      .json(new ApiResponse(200, taskDone[0], "Task fetched successfully"));
})

  


export {
    addTask,
    taskbyId,
    allTasks,
    allTaskbyprogramId,
    deleteTask,
    updateTask,
    gettaskdone
}