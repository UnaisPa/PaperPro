export const deletePostByAdminUseCase = (dependencies) =>{
    const {repository:{deletePostByAdminRepo}} = dependencies;
    const executeFunction = async(id) =>{
        const response = await deletePostByAdminRepo(id);
        return response;
    }
    return {executeFunction}
}