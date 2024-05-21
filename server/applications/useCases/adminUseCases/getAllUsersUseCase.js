
export const getAllUsersUseCase = (dependencies) =>{
    const {repository:{getAllUsersRepo}} = dependencies;
    const executeFunction = async (p) =>{
        const response = await getAllUsersRepo(p);
        return response;
    }
    return {executeFunction}
}