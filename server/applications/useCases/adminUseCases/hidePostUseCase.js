export const hidePostUseCase = (dependencies) => {
    const { repository: { hidePostRepo } } = dependencies;
    const executeFunction = async (postId,type) => {
        const response = await hidePostRepo(postId,type);
        return response;
    }
    return { executeFunction }
}