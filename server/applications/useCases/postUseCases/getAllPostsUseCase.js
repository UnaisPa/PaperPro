export const getAllPostsUseCase = (dependencies) =>{
    const {repository:{getAllPostsRepo}} = dependencies
    const executeFunction = async (limit) =>{
        const response = await getAllPostsRepo(limit);
        return response;
    }
    return{executeFunction}
}