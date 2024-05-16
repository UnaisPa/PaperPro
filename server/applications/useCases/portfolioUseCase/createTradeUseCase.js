export const createTradeUseCase = (dependencies) =>{
    const {repository:{createTradeRepo}} = dependencies;
    const executeFunction = async (formData,timeFrame,type,id,price,symbol) =>{
        const response = await createTradeRepo(formData,timeFrame,type,id,price,symbol);
        return response;
    }
    return {executeFunction}
}