import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const logoutUserController = expressAsyncHandler(async(req,res)=>{
        try{
            res.clearCookie('jwt')
            res.status(200).json({ message: "Logged Out" });
        }catch(err){
            res.status(500).json(err.message)
        }
    })
    return logoutUserController
}