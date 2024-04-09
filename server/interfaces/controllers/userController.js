import asyncHandler from "express-async-handler";
import UserUseCases from "../../useCases/userUseCases.js";
import expressAsyncHandler from "express-async-handler";
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


//@desk      Register a new User
//route      POST api/users/register
//@access    Public

const registerUser = asyncHandler( async (req,res) =>{
    try{
        const newUser = await userUseCases.createUser(req.body);
        console.log(newUser.message);
        res.status(201).json(newUser.message);
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
    registerUser,
    authUser,
    googleAuth,
    logoutUser
};