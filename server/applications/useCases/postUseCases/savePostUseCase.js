export const savePostUseCase = (dependencies) =>{
    const {repository:{savePostRepo}} = dependencies
    const executeFunction = async(userId,postId)=>{
        const response = await savePostRepo(userId,postId);
        return response;
    }
    return {executeFunction}
}