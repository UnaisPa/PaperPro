export const createAdminUseCase = (dependencies) =>{
    const {repository:{createAdminRepo}} = dependencies;
    const executeFunction = async (data,profilePicture) =>{
        const response = await createAdminRepo(data,profilePicture);
        return response;
    }
    return {executeFunction}
}