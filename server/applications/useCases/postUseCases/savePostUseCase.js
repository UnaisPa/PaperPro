export const savePostUseCase = (dependencies) =>{
    const {repository:{savePostRepo}} = dependencies
    const executeFunction = async(userId,postId,action)=>{
        const response = await savePostRepo(userId,postId,action);
        return response;
    }
    return {executeFunction}
}