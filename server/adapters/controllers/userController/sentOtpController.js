import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {sentOtpUseCase} = dependencies.useCase;
    const sentOtpController = expressAsyncHandler(async(req,res)=>{
        const {email} = req.body
        try{
            const response = await sentOtpUseCase(dependencies).executeFunction(email);
            //console.log(sendOtpEmail.message);
            if(response){
            res.status(201).json(response);
            }
        }catch(err){
            res.status(500).json(err.message)
        }
    })
    return sentOtpController
} 