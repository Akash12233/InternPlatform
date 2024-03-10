import {Router} from "express";
import {
   
    programbyId,
    allprograms,
    deleteprogram,
   
    updatedProgram,
    getprogramdone,
    addProgram} from "../controllers/program.controller.js";
import {verifyjwt} from "../middlewares/userauth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const programrouter= Router();

programrouter.route("/register").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        }
    ]),
    addProgram
)


programrouter.route("/programbyid").post(verifyjwt, programbyId)
programrouter.route("/allprograms").get(verifyjwt, allprograms)
programrouter.route("/deleteprogram").post(verifyjwt, deleteprogram)

programrouter.route("/updateprogram").patch(verifyjwt, updatedProgram)
programrouter.route("/getprogramdone").get(verifyjwt, getprogramdone)

export default programrouter;