export const checkCPasswordUseCase = (dependencies) =>{
    const {repository:{checkCPasswordRepo}} = dependencies;
    const executeFunction = async(userId,password)=>{
        const response = await checkCPasswordRepo(userId,password);
        return response;
    }
    return {executeFunction}
}