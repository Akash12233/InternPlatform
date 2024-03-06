import {addUseraction,
    addsolution,
    getuseraction,
    verifyingsolution} from "../controllers/useraction.controller.js";
import {Router} from "express";
import {verifyjwt} from "../middlewares/userauth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";


const useractionrouter= Router();

useractionrouter.route("/adduseraction").post(verifyjwt,addUseraction)
useractionrouter.route("/addsolution").post(verifyjwt,upload.single("solution"),addsolution)
useractionrouter.route("/getuseraction").get(verifyjwt,getuseraction)
useractionrouter.route("/verifyingsolution").post(verifyjwt,verifyingsolution)

export default useractionrouter;