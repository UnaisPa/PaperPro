export const markAsReadUseCase = (dependencies) =>{
    const {repository:{markAsReadRepo}} = dependencies;
    const executeFunction = async (chatId) =>{
        const response = await markAsReadRepo(chatId);
        return response;
    }
    return {executeFunction}
}