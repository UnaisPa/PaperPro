export const getLikedUsersUseCase = (dependencies) =>{
    const {repository:{getLikedUsersRepo}} = dependencies;
    const executeFunction = async(postId) =>{
        const response = await getLikedUsersRepo(postId);
        return response
    }
    return {executeFunction}
}