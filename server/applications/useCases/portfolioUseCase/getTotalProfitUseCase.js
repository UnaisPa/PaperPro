export const getTotalProfitUseCase = (dependencies) =>{
    const {repository:{getTotalProfitRepo}} = dependencies;
    const executeFunction = async (userId)=>{
        const response = await getTotalProfitRepo(userId);
        return response;
    }
    return {executeFunction}
}