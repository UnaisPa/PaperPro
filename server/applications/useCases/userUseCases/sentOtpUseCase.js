
export const sentOtpUseCase = (dependencies) =>{
    const {repository:{sentOtpRepo}} = dependencies
    const executeFunction = async(email,from) =>{
        const response = await sentOtpRepo(email,from);
        return response
    }
    return {executeFunction}
}