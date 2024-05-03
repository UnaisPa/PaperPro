import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {verifyOtpUseCase} = dependencies.useCase
    const verifyOtpController = expressAsyncHandler(async(req,res)={
        
    })
}