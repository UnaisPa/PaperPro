export const createReportPostUseCase = (dependencies) =>{
    const {repository:{createReportPostRepo}} = dependencies;
    const executeFunction = async(postId,postBy,reportedBy,reason) =>{
        const response = await createReportPostRepo(postId,postBy,reportedBy,reason);
        return response;
    }
    return {executeFunction}
}