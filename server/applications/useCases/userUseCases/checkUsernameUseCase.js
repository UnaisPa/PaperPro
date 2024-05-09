export const checkUsernameUseCase =(dependencies) =>{
    const {repository:{checkUsernameRepo}} = dependencies;
    const executeFunction = async(user)=>{
        const response  = await checkUsernameRepo(user);
        return response;
    }
    return {executeFunction}
}