export const getPositionsUseCase = (dependencies) =>{
    const {repository:{getPositionsRepo}} = dependencies;
    const executeFunction = async(userId)=>{
        const response = await getPositionsRepo(userId);
        return response;
    }
    return {executeFunction}
}