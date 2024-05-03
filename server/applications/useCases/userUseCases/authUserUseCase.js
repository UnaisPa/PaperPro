export const authUserUseCase = (dependencies) =>{
    const {repository:{authUserRepo}} = dependencies
    const executeFunction = async (res,email,password) =>{
        const response = await authUserRepo(res,email,password);
        if(response.status){
            return response
        }else {
            return response
        }
    }
    return {executeFunction}
}