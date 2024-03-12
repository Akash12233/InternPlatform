import mongoose from "mongoose";
import {addProgramUser, getProgramsByProgram, getProgramsByUser} from "../controllers/userPrograms.controller.js";
import {Router} from "express";
import {verifyjwt} from "../middlewares/userauth.middleware.js";

const userProgramsrouter= Router();

userProgramsrouter.route("/addprogramuser").post(verifyjwt,addProgramUser)
userProgramsrouter.route("/getprogrambyuser").post(verifyjwt,getProgramsByUser)
userProgramsrouter.route("/getprogrambyprogram").post(verifyjwt,getProgramsByProgram)

export default userProgramsrouter