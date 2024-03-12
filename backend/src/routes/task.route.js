import { taskbyId, allTasks, addTask, deleteTask, updateTask, allTaskbyprogramId, gettaskdone } from "../controllers/task.controller.js";
import { Router } from "express";
import { verifyjwt } from "../middlewares/userauth.middleware.js";


const taskrouter= Router();

taskrouter.route("/taskbyid").get(verifyjwt, taskbyId)
taskrouter.route("/alltasks").get( allTasks)
taskrouter.route("/addtask").post( addTask)
taskrouter.route("/deletetask").delete( deleteTask)
taskrouter.route("/updatetask").patch(verifyjwt, updateTask)
taskrouter.route("/alltaskbyprogramid").get(verifyjwt, allTaskbyprogramId)
taskrouter.route("/gettaskdone").get(verifyjwt, gettaskdone)

export default taskrouter