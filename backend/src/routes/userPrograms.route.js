import mongoose from "mongoose";

import {Router} from "express";
import {verifyjwt} from "../middlewares/userauth.middleware.js";

const userProgramsrouter= Router();

userProgramsrouter.route("/addprogramuser").post(verifyjwt,addProgramUser)
userProgramsrouter.route("/getprogrambyuser").post(verifyjwt,getProgramsByUser)
userProgramsrouter.route("/getprogrambyprogram").post(verifyjwt,getProgramsByProgram)

export default userProgramsrouter