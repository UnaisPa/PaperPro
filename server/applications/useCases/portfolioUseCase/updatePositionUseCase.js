export const updatePositionUseCase = (dependencies) =>{
    const {repository:{updatePositionRepo}} = dependencies;
    const executeFunction = async(id,reason,profit,companyName,profitPercentage,userId) =>{
        const response = await updatePositionRepo(id,reason,profit,companyName,profitPercentage,userId);
        return response
    }
    return {executeFunction}
}