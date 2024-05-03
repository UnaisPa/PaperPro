
export const googleAuthUseCase = (dependencies)=>{
    const {repository:{googleAuthRepo}} = dependencies
    const executeFunction = async(res,name,email) =>{
        const response = await googleAuthRepo(res,name,email);
        return response;
    }
    return {executeFunction}
}