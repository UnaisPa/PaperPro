export const createChatUseCase = (dependencies) =>{
    const {repository:{createChatRepo}} = dependencies;
    const executeFunction = async(userId,otherUserId) =>{
        const response = await createChatRepo(userId,otherUserId);
        return response;
    }
    return {executeFunction}
}