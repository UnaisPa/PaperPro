export const addWatchlistUseCase = (dependencies) =>{
    const {repository:{addWatchlistRepo}} = dependencies;
    const executeFunction = async(userId,symbol) =>{
        const response = await addWatchlistRepo(userId,symbol);
        return response;
    }
    return {executeFunction}
}