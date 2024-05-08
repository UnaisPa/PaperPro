
export const updateFollowListUseCase = (dependencies) =>{
    const {repository:{updateFollowListRepo}} = dependencies;
    const executeFunction = async(currentUserId, userId,action)=>{
        const response = await updateFollowListRepo(currentUserId, userId,action);
        return response;
    }
    return {executeFunction}
}