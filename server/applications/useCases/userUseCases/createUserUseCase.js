
export const createUserUseCase = (dependencies) =>{
    const {repository:{createUserRepo}} = dependencies
    const executeFunction = async(name, email, mobile, password) =>{
        const response = await createUserRepo(name, email, mobile, password)
        if(response.success){
            return response
        }else{
            return response
        }
    }
    return {executeFunction}
}