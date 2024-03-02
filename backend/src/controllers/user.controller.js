import {asynHandler} from "../utils/asyncHandler.js";
import user from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

import user from "../models/user.model.js";

const generateAccessTokenandRefreshToken = async(userId) => {
    try {
        const User = await user.findById(userId)
        const accessToken= User.generateAccessToken();
        const refreshToken= User.generateRefreshToken();

        User.refreshtoken=refreshToken;
        await User.save({validateBeforeSave:false}); // to just not save password everytime

        return {
            accessToken,
            refreshToken
        }


    } catch (error) {
        throw new ApiError(500, "Something went wrong");
    }
};

const registerUser =asynHandler(async (res, req)=>{
    // get user details from frontend

    const {firstname, lastname, email, password} = req.body;

    if([fullName, email, username, firstname,lastname, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError (409,"All fields are required");
    }
    
    const existedUser = await user.findOne({
        $or: [{email}, {username}]
    });

    if(existedUser){
        throw new ApiError(401, "User already exists");
    }

    const avatarLocalPath = req.file?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Profile picture is required");
    }

    const avatar= await uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        throw new ApiError(400, "Something went wrong");
    }

    const User = await user.create({
        firstname,
        lastname,
        avatar: avatar.secure_url,
        email,
        password,
        username:username.tolowerCase()
    })

    const createdUser = await user.findById(User._id).select(
        "-password -refreshtoken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong registering");
    }

    return res.status(201)
    .json(
        new ApiResponse(201, createdUser,"User created successfully")
    )
});

const loginUser= asynHandler( async (res, req)=> {
    const {email,username, password} = req.body;
    //console.log(email, username, password);

    if(!username && !email){
        throw new ApiError(400, "Email or username is required");
    }

    const User = await user.findOne({
        $or: [{email}, {username}]
    })

    if(!user){
        throw new ApiError(404, "User not found");
    }
    
    const ispasswordCorrect = await User.ispasswordCorrect(password);

    if(!ispasswordCorrect){
        throw new ApiError (401, "Invalid user Creditials")
    }

    const {accessToken, refreshToken}=await generateAccessTokenandRefreshToken(User._id);

    const loggedInUser= await user.findById(User._id).select("-password -refreshtoken")

    const options ={
        httpOnly: true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accesstoken", accessToken, options)
    .cookie("refreshtoken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken, refreshToken
            },
            "User Logged In successfully"
        )
    )

})

const logoutUser = asynHandler( async (res, req, next)=>{
    await user.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshtoken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly : true,
        secure:true
    }

    return res
    .status(400)
    .clearcookie("accesstoken", options)
    .clearcookie("refreshtoken", options)
    .json(
        new ApiResponse(200, {}, "User Logged out")
    )
})

const refreshAccessToken = asynHandler( async (res, req,_)=>{
    const incomingRefreshToken = req.cookies?.refreshtoken || req.body.refrehtoken;
    if(!incomingRefreshToken){
        throw new ApiError(401, "User not authenticated");
    }
    try {
        const decoded = jwt.verify(incomingRefreshToken,
             process.env.REFRESH_TOKEN_SECRET);
        
        const User= await user.findById(decoded?._id);
    
        if(!User){
            throw new ApiError(404, "Invalid refresh token");
        }

        if(incomingRefreshToken !== User?.refreshtoken){
            throw new ApiError(401, "refresh token is expired");
        }

        const options = {
            httpOnly:true,
            secure:true
        }

        const {accessToken, newrefreshToken}= await generateAccessTokenandRefreshToken(User._id);

        return res
        .status(200)
        .cookie("accesstoken", accessToken, options)
        .cookie("refreshtoken", newrefreshToken, options)
        .json(
            new ApiResponse(200, {
                accessToken, refreshtoken: newrefreshToken
            },
            "Access token refreshed"
            )
        )
        
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid AccessToken");
    }
})

const changecurrentPassword= asynHandler(async(res, req)=>{
    const {currentPassword, newPassword}= req.body;

    const User= user.findById(req.user?._id);
    const ispasswordCorrect=User.isPasswordCorrect(currentPassword);

    if(!ispasswordCorrect){
        throw new ApiError(400, "Current password is incorrect");
    }

    User.password= newPassword;
    await User.save({validateBeforeSave:false});

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password changed successfully")
    )
})

const getcurrentuser= asynHandler(async(res, req)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "User fetched successfully")
    )
})

const getAllUsers= asynHandler(async(res, req)=>{
    const users= await user.find();
    return res 
    .status(200)
    .json(
        new ApiResponse(200, users, "Users fetched successfully")
    )
})

const updateAccountDetails= asynHandler(async(res, req)=>{
    const {firstname, lastname, email}= req.body;

    if(!firstname && !lastname && !email){
        throw new ApiError(400, "All fields is required");
    }

    const User = await user.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                firstname, lastname, email:email
            }
        },
        {new:true}
    ).select("-password");

    return res 
    .status(200)
    .json(new ApiResponse(200, User, "User updated successfully"));

})

const updateavatar= asynHandler(async(res, req)=>{
    const updateLocalpath= req.file?.avatar[0]?.path;

    if(!updateLocalpath){
        throw new ApiError(400, "Profile picture is required");
    }

    const avatar= await uploadOnCloudinary(updateLocalpath);

    if(!avatar?.url){
        throw new ApiError(400, "Error on Uploading avatar");
    }

    const  User= user.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password");

    return res
    .status(200)
    .json(new ApiResponse(200, User, "Avatar updated successfully"))
});



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changecurrentPassword,
    getcurrentuser,
    getAllUsers,
    updateAccountDetails,
    updateavatar
}