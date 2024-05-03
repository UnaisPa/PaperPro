
export const updateFollowListUseCase = (dependencies) =>{
    const {repository:{updateFollowListRepo}} = dependencies;
    const executeFunction = async(currentUserId, userId)=>{
        const response = await updateFollowListRepo(currentUserId, userId);
        return response;
    }
    return {executeFunction}
}