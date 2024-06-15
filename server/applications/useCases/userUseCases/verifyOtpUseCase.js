
export const verifyOtpUseCase = (dependencies) =>{
    const {repository:{verifyOTPRepo}} = dependencies
    const executeFunction = async(email,otp,from)=>{
        const response = await verifyOTPRepo(email,otp,from);
        return response
    }
    return {executeFunction}
}