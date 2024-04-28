import asyncHandler from "express-async-handler";
import UserUseCases from "../../useCases/userUseCases.js";
import expressAsyncHandler from "express-async-handler";
import mongoose from 'mongoose';
const userUseCases = new UserUseCases


//@desk      User login - generate Token
//route      POST api/users/auth
//@access    Public

const authUser = asyncHandler( async(req,res)=>{
    try{
        const {email,password} = req.body
        console.log(email)
        const auth = await userUseCases.authUser(res,email,password);
        if(auth.user){
            res.status(200).json({ user: auth.user, token: auth.token });
        }else{
            res.status(404).json(auth.message) 
        }
    }catch(err){
        res.status(500).json(err.message)
    }
})


//@desk      send otp to user
//route      POST api/users/register
//@access    Public

const registerUser = asyncHandler( async (req,res) =>{
    try{
        const sendOtpEmail = await userUseCases.sendOTP(req.body);
        //console.log(sendOtpEmail.message);
        res.status(201).json(sendOtpEmail);
    }catch(err){
        res.status(500).json(err.message)
    }
}

)
//@desk      Verify otp and create new user
//route      POST api/users/verify_otp
//@access    Public

const verfyOTP = expressAsyncHandler(async(req,res)=>{
    try{
        let {name,email,mobile,password,otp} = req.body
        console.log(name,email,mobile,password,otp)

        const verify = await userUseCases.verfyOTP(email,otp);
        if(verify===true){
            let newUser = await userUseCases.createUser(name,email,mobile,password);
            res.status(200).json(newUser);
        }else{
            console.log(verify.message)
            //if verify variable is not true, then it returns error messages
            res.status(200).json({success:false, message:verify.message})
        }
    }catch(err){
        res.status(500).json(err.message)
    }
})

//@desk      auth with google
//route      POST api/users/google_auth
//@access    Public
const googleAuth = expressAsyncHandler(async(req,res)=>{
    try{
        const googleAuth = await userUseCases.googlAuth(res,req.body);
        if(googleAuth.user){
            res.status(200).json({ user: googleAuth.user, token: googleAuth.token });
        }else{
            res.status(404).json(googleAuth.message) 
        }
    }catch(err){
        res.status(500).json(err.message)
    }
})

//@desk      Getting User profile
//route      GET api/users/profile
//@access    Private
const getUserProfile = expressAsyncHandler(async(req,res)=>{
    try{
        // const userId = new mongoose.Types.ObjectId('661ca75291543d8591172d63')
        const userId = req.query.userId || 'no'
        //console.log(userId);
        const user = await userUseCases.getUserById(userId);
        res.json({success:true,user});
    }catch(err){
        res.status(500).json(err.message)
    }
})


//@desk      User logout
//route      POST api/users/logout
//@access    Private
const logoutUser = expressAsyncHandler(async(req,res)=>{
    try{
        res.clearCookie('jwt')
        res.status(200).json({ message: "Logged Out" });
    }catch(err){
        res.status(500).json(err.message)
    }
})
export {
    authUser,
    registerUser,
    verfyOTP,
    googleAuth,
    logoutUser,
    getUserProfile
};