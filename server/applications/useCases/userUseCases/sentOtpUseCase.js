
export const sentOtpUseCase = (dependencies) =>{
    const {repository:{sentOtpRepo}} = dependencies
    const executeFunction = async(email) =>{
        const response = await sentOtpRepo(email);
        return response
    }
    return {executeFunction}
}