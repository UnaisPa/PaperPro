export const getPastTradesUseCase = (dependencies) =>{
    const {repository:{getPastTradesRepo}} = dependencies;
    const executeFunction = async(userId)=>{
        const response = await getPastTradesRepo(userId);
        return response;
    }
    return {executeFunction}
}