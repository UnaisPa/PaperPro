export const getSavedPostsUseCase = (dependencies) =>{
    const {repository:{getSavedPostsRepo}} = dependencies;
    const executeFunction = async(userId)=>{
        const response = await getSavedPostsRepo(userId);
        return response;
    }
    return {executeFunction}
}