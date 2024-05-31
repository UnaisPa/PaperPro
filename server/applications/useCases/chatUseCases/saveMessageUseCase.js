export const saveMessageUseCase = (dependencies) =>{
    const {repository:{saveMessageRepo}} = dependencies;
    const executeFunction = async(sender,content,chatId) =>{
        const response = await saveMessageRepo(sender,content,chatId);
        return response;
    }
    return {executeFunction}
}