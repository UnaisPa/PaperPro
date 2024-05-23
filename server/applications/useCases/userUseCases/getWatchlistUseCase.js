export const getWatchlistUseCase = (dependencies) =>{
    const {repository:{getWatchlistRepo}} = dependencies;
    const executeFunction = async(userId)=>{
        const response = await getWatchlistRepo(userId);
        return response
    }
    return {executeFunction}
}