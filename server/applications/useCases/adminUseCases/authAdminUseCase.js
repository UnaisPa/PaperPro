export const authAdminUseCase = (dependencies) =>{
    const {repository:{authAdminRepo}} = dependencies
    const executeFunction = async(res,email,password) =>{
        const response = await authAdminRepo(res,email,password);
        return response
    }
    return {executeFunction}
}