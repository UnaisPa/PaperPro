export const countUnreadUseCase = (dependencies) =>{
    const {repository:{countUnreadRepo}} = dependencies;
    const executeFunction = async(chatId)=>{
        const response = await countUnreadRepo(chatId);
        return response;
    }
    return {executeFunction}
}
