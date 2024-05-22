import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {sentOtpUseCase} = dependencies.useCase;
    const sentOtpController = expressAsyncHandler(async(req,res)=>{
        const {email} = req.body
        const from = req.body.from || false
        try{
            const response = await sentOtpUseCase(dependencies).executeFunction(email,from);
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