export const updatePasswordUseCase = (dependencies) =>{
    const {repository:{updatePasswordRepo}} = dependencies;
    const executeFunction = async(password,userId) =>{
        //console.log('ns')
        const response = await updatePasswordRepo(password,userId);
        return response
    }
    return {executeFunction}
}       