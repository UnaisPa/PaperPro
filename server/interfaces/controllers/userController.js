import expressAsyncHandler from "express-async-handler";
import UserUseCases from "../../useCases/userUseCases.js";
const userUseCases = new UserUseCases



//@desk      Register a new User
//route      POST api/users/register
//@access    Public

const registerUser = expressAsyncHandler( async (req,res) =>{
    try{
        const newUser = await userUseCases.createUser(req.body);
        console.log(newUser.message);
        res.status(200).json(newUser.message);
    }catch(err){
        res.status(400).json(err.message)
    }
})

export {
    registerUser,
};