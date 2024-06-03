export const getReportedPostsUseCase = (dependencies) =>{
    const {repository:{getReportedPostsRepo}} = dependencies;
    const executeFunction = async (limit) =>{
        const response = await getReportedPostsRepo(limit);
        return response;
    }
    return {executeFunction}
}