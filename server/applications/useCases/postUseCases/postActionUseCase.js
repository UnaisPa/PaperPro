export const postActionUseCase = (dependencies) =>{
    const {repository:{postActionRepo}} = dependencies
    const executeFunction = async (postId,action,userId) =>{
        const response = await postActionRepo(postId,action,userId);
        return response;
    }
    return {executeFunction}
}