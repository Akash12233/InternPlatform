import {Router} from "express";
import {registerProgram,
    addUser,
    programbyId,
    allprograms,
    deleteprogram,
    removeUser,
    updatedProgram,
    getprogramdone} from "../controllers/program.controller.js";
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
    registerProgram
)

programrouter.route("/adduser").post(verifyjwt, addUser)
programrouter.route("/programbyid").get(verifyjwt, programbyId)
programrouter.route("/allprograms").get(verifyjwt, allprograms)
programrouter.route("/deleteprogram").post(verifyjwt, deleteprogram)
programrouter.route("/removeuser").post(verifyjwt, removeUser)
programrouter.route("/updateprogram").patch(verifyjwt, updatedProgram)
programrouter.route("/getprogramdone").get(verifyjwt, getprogramdone)

export default programrouter;