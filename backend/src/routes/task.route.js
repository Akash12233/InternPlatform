import { taskbyId, allTasks, addTask, deleteTask, updateTask, allTaskbyprogramId } from "../controllers/task.controller";
import { Router } from "express";
import { verifyjwt } from "../middlewares/userauth.middleware";


const taskrouter= Router();

taskrouter.route("/taskbyid").get(verifyjwt, taskbyId)
taskrouter.route("/alltasks").get(verifyjwt, allTasks)
taskrouter.route("/addtask").post(verifyjwt, addTask)
taskrouter.route("/deletetask").post(verifyjwt, deleteTask)
taskrouter.route("/updatetask").patch(verifyjwt, updateTask)
taskrouter.route("/alltaskbyprogramid").get(verifyjwt, allTaskbyprogramId)


export default taskrouter