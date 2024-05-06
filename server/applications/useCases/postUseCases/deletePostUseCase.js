
export const deletePostUseCase = (dependencies) =>{
    const {repository:{deletePostRepo}} = dependencies;
    const executeFunction = async (postId)=>{
        const response = await deletePostRepo(postId);
        return response;
    }
    return {executeFunction}
}