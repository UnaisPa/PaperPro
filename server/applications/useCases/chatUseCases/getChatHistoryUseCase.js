export const getChatHistoryUseCase = (dependencies) =>{
    const {repository:{getChatHistoryRepo}} = dependencies;
    const executeFunction = async(chatId) =>{
        const response = await getChatHistoryRepo(chatId);
        return response;
    }
    return {executeFunction}
}