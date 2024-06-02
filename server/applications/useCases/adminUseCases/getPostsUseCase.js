export const getPostsUseCase = (dependencies) =>{
    const {repository:{getPostsRepo}} = dependencies;
    const executeFunction = async(limit,skip) =>{
        const response = await getPostsRepo(limit,skip);
        return response;
    }
    return {executeFunction}
}