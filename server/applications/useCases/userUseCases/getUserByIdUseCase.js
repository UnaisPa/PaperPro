
export const getUserByIdUseCase = (dependencies) =>{
    const {repository:{getUserByIdRepo}} = dependencies;
    const executeFunction = async (userId) =>{
        const response = await getUserByIdRepo(userId);
        if(response.success){
            //console.log('success')
            return response.user
            
        }else{
            throw new Error(response.message);
        }
        
    }
    return{executeFunction}
}