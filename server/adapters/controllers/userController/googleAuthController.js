import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {googleAuthUseCase} = dependencies.useCase
    const googleAuthController = expressAsyncHandler(async(req,res)=>{
        const {name,email} = req.body
        const response = await googleAuthUseCase(dependencies).executeFunction(res,name,email);
        if(response.success){
            res.status(200).json({success:true, user: response.user, token: response.token });
        }else{
            res.status(404).json(response.message) 
        }
    })
    return googleAuthController
}