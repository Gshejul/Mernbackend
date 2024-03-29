import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(  async (req, res) => {
   
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullname , email, username, password } = req.body
    console.log("email : " , email)

    // if(fullname === ""){
    //     throw new ApiError(400, "fullname is required")
    // }
    //optimize way
    if(
        [fullname, email, username, password].some((field) => field?.trim() === ""))
        {
                throw new ApiError(400, "all fields are required")
        }

        if(!email.includes("@")){
            throw new ApiError(400, "email is not valid or includes @")
        }

        const existedUser = User.findOne({
            $or: [ { email } , { username } ]
        })
        if(existedUser){
            throw new ApiError(409, "user with email or username already  exited")
        }
        const avatarLocalPath = req.files?.avatar[0]?.path
        const coverImageLocalPath = req.files?.coverImage[0]?.path

        if(!avatarLocalPath){
            throw new ApiError(400, "avatar file is compulsory")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){
            throw new ApiError(400, "avatar file is compulsory")
        }

        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username:username.toLowerCase()
        })

        const createUser = await user.findById(user._id).select("-password -refreshToken")

        if(!createUser){
            throw new ApiError(500 , "something went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponse(200, createUser, "user register successfully")
        )
})

export {registerUser}