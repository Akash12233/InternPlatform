import {Router} from "express";
import {registerUser,
        loginUser,
        logoutUser,
        getcurrentuser,
        getAllUsers,
        changecurrentPassword,
        updateavatar,
        refreshAccessToken,
        updateAccountDetails} from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/userauth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const Userrouter= Router();
 
Userrouter.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
    )
Userrouter.route("/login").post(loginUser)
    //secured routes

Userrouter.route("/logout").post(verifyjwt,  logoutUser)
Userrouter.route("/refresh-token").post(refreshAccessToken)
Userrouter.route("/change-password").patch(verifyjwt, changecurrentPassword)
Userrouter.route("/current-user").get(verifyjwt, getcurrentuser)
Userrouter.route("/update-account").patch(verifyjwt, updateAccountDetails)
Userrouter.route("/allusers").get(verifyjwt, getAllUsers)
Userrouter.route("/avatar").patch(verifyjwt, upload.single("avatar"), updateavatar)

export default Userrouter;
