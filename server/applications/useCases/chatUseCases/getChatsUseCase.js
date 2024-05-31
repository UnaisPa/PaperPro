export const getChatsUseCase = (dependencies) =>{
    const {repository:{getChatsRepo}} = dependencies;
    const executeFunction = async(id)=>{
        const response = await getChatsRepo(id);
        return response;
    }
    return  {executeFunction}
} 