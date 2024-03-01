import { subtaskbyId, 
    allsubTasks, 
    allsubTaskbytaskId, 
    addsubTask, 
    deletesubTask, 
    updatesubTask, 
    updateSolution } from "../controllers/subtask.controller";
import { verifyjwt } from "../middlewares/userauth.middleware";
import { Router } from "express";


const subtaskrouter= Router();

subtaskrouter.route("/subtaskbyid").get(verifyjwt, subtaskbyId)
subtaskrouter.route("/allsubtasks").get(verifyjwt, allsubTasks)
subtaskrouter.route("/allsubtaskbytaskid").get(verifyjwt, allsubTaskbytaskId)

subtaskrouter.route("/addsubtask").post(verifyjwt,
    upload.fields([
    {
        name: "solution",
        maxCount: 1
    }
]), addsubTask)

subtaskrouter.route("/deletesubtask").post(verifyjwt, deletesubTask)
subtaskrouter.route("/updatesubtask").patch(verifyjwt, updatesubTask)
subtaskrouter.route("/updatesolution").patch(verifyjwt, upload.single("solution"),updateSolution)

export default subtaskrouter