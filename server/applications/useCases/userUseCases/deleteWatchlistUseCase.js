export const deleteWatchlistUseCase = (dependencies) =>{
    const {repository:{deleteWatchlistRepo}} = dependencies;
    const executeFunction = async(stockId,userId) =>{
        const response = await deleteWatchlistRepo(stockId,userId);
        return response;
    }
    return {executeFunction}
}