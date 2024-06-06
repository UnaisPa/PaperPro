export const getDashboardDetailsUseCase = (dependencies) =>{
    const {repository:{getDashboardDetailsRepo}} = dependencies;
    const executeFunction = async () =>{
        const response = await getDashboardDetailsRepo();
        return response;
    }
    return {executeFunction}
}