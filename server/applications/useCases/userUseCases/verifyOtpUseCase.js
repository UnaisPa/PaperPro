
export const verifyOtpUseCase = (dependencies) =>{
    const {repository:{verifyOtpRepo}} = dependencies
    const executeFunction = async(email,otp)=>{
        const response = await verifyOtpRepo(email,otp);
        return response
    }
    return {executeFunction}
}