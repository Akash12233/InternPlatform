import { subtaskbyId, 
    allsubTasks, 
    allsubTaskbytaskId, 
    addsubTask, 
    deletesubTask, 
    updatesubTask, 
    updateSolution } from "../controllers/subtask.controller.js";
import { verifyjwt } from "../middlewares/userauth.middleware.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";


const subtaskrouter= Router();

subtaskrouter.route("/subtaskbyid").get(verifyjwt, subtaskbyId)
subtaskrouter.route("/allsubtasks").get( allsubTasks)
subtaskrouter.route("/allsubtaskbytaskid").get(verifyjwt, allsubTaskbytaskId)

subtaskrouter.route("/addsubtask").post(
    upload.fields([
    {
        name: "solution",
        maxCount: 1
    }
]), addsubTask)

subtaskrouter.route("/deletesubtask").delete(deletesubTask)
subtaskrouter.route("/updatesubtask").patch(verifyjwt, updatesubTask)
subtaskrouter.route("/updatesolution").patch(verifyjwt, upload.single("solution"),updateSolution)

export default subtaskrouter