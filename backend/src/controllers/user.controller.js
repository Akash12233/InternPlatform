import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
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

const registerUser =asyncHandler(async (req, res)=>{
    // get user details from frontend
// console.log(req.body);
// console.log(req.files);
    const {firstname, lastname, username, email, password} = req.body;

    
    
    const existedUser = await user.findOne({
        $or: [{email}, {username}]
    });

    if(existedUser){
        return res.send( new ApiResponse(401, "Email or Username already exists"));
        
       
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        return res.send( new ApiResponse(400, "Please select an image"));
        
        
        
    }
    
    const avatar= await uploadOnCloudinary(avatarLocalPath);
    // console.log(avatar);
    if(!avatar){

        return res.status(400).json( new ApiResponse(400, "Something went wrong"));
    }

    const User = await user.create({
        firstname,
        lastname,
        username,
        email,
        password,
        avatar: avatar.secure_url,
    })

    const createdUser = await user.findById(User._id).select(
        "-password -refreshtoken"
    )

    if(!createdUser){
       return res.status(500).json( new ApiResponse(500, "Something went wrong registering"));
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201, createdUser,"User created successfully")
    )
});

const loginUser= asyncHandler( async (req,res)=> {
    const {username, email, password} = req.body;
    

    const User = await user.findOne({
        $or: [{email}, {username}]
    })

    if(!user){
        return res.status(404).json("User not found");
     
    }
    
    const ispasswordCorrect = await User.isPasswordCorrect(password);

    if(!ispasswordCorrect){
        return res.status(401).json("Incorrect Password");
       
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

const logoutUser = asyncHandler( async ( req, res, next)=>{
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

const refreshAccessToken = asyncHandler( async (res, req,_)=>{
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

const changecurrentPassword= asyncHandler(async(req,res)=>{
    const {currentPassword, newPassword}= req.body;
    const User= user.findById(req.user?._id);

    const isPasswordCorrect = await User.isPasswordCorrect(currentPassword);

    if(!isPasswordCorrect){
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

const getcurrentuser= asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "User fetched successfully")
    )
})

const getAllUsers= asyncHandler(async(res, req)=>{
    const users= await user.find();
    return res 
    .status(200)
    .json(
        new ApiResponse(200, users, "Users fetched successfully")
    )
})

const updateAccountDetails= asyncHandler(async(req,res)=>{
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

const updateavatar= asyncHandler(async(req,res)=>{
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