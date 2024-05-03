
export const createCommentUseCase = (dependencies) =>{
    const {repository:{createCommentRepo}} = dependencies
    const executeFunction = async(postId, userId, text) =>{
        const response = await createCommentRepo(postId,userId,text);
        return response;
    }
    return {executeFunction}
}