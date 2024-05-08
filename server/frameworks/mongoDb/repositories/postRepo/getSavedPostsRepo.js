import SavedPosts from "../../database/entities/SavedPosts.js"

const getSavedPostsRepo = async (userId) => {
    try {
        const userSavedPosts = await SavedPosts.findOne({ user: userId }, { posts: true });
        const savedPostsDoc = await userSavedPosts.populate({
            path: 'posts',
            populate: [{
                path: 'user',
                model: 'User',
            }, {
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User' // Assuming 'User' is the model name for the user schema
                }
            }

            ],

        })

        return { success: true, posts: savedPostsDoc.posts }

    } catch (err) {
        throw new Error(err)
    }
}
export default getSavedPostsRepo