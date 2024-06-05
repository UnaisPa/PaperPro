export const getUserPortfolioUseCase = (dependencies) =>{
    const {repository:{getUserPortfolioRepo}} = dependencies;
    const executeFunction = async (id) =>{
        const response = await getUserPortfolioRepo(id);
        return response;
    }
    return {executeFunction}
}