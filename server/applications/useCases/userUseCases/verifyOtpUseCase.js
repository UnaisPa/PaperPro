
export const verifyOtpUseCase = (dependencies) =>{
    const {repository:{verifyOTPRepo}} = dependencies
    const executeFunction = async(email,otp)=>{
        const response = await verifyOTPRepo(email,otp);
        return response
    }
    return {executeFunction}
}