import expressAsyncHandler from "express-async-handler"

export default (dependencies) => {
    const { verifyOtpUseCase } = dependencies.useCase
    const verifyOtpController = expressAsyncHandler(async (req, res) => {
        const {email,otp} = req.body
        const verify = await verifyOtpUseCase(dependencies).executeFunction(email, otp)
        if (verify === true) {
            
            res.status(200).json({success:true,message:'You can change your password'});
        } else {
            console.log(verify.message)
            //if verify variable is not true, then it returns error messages
            res.status(200).json({ success: false, message: verify.message })
        }
    })
    return verifyOtpController
}