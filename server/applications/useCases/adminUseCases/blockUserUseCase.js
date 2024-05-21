export const blockUserUseCase = (dependencies) =>{
    const {repository:{blockUserRepo}} = dependencies;
    const executeFunction = async (userName,action) =>{
        const response = await blockUserRepo(userName,action)
        return response;
    }
    return {executeFunction}
}