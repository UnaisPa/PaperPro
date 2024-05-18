import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {googleAuthUseCase} = dependencies.useCase
    const googleAuthController = expressAsyncHandler(async(req,res)=>{
        const {name,email} = req.body
        const response = await googleAuthUseCase(dependencies).executeFunction(res,name,email);
        if(response.success){
            res.status(200).json({success:true, user: response.user, token: response.token,refreshToken:response.refreshToken });
        }else{
            res.status(400).json(response.message) 
        }
    })
    return googleAuthController
}