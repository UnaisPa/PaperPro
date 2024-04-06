import asyncHandler from "express-async-handler";
import UserUseCases from "../../useCases/userUseCases.js";
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
            res.status(200).json(auth.user)
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


export {
    registerUser,
    authUser
};