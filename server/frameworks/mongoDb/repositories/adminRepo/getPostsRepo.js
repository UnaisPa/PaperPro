import Post from "../../database/entities/Post.js"

const getPostsRepo = async (limit,skip) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'User' // Assuming 'User' is the model name for the user schema
            }
        })
        return posts
    } catch (err) {
        throw new Error(err)
    }
}

export default getPostsRepo