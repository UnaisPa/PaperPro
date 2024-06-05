export const getAdminsUseCase = (dependencies) =>{
    const {repository:{getAdminsRepo}} = dependencies;
    const executeFunction = async () =>{
        const response = await getAdminsRepo();
        return response;
    }
    return {executeFunction}
}