export const createPostUseCase = (dependencies) =>{
    const {repository:{createPostRepo}} = dependencies
    const executeFunction = async(userId,  content, mediaUrls )=>{
        const response = await createPostRepo(userId,content,mediaUrls);
        return response
    }
    return {executeFunction}
}