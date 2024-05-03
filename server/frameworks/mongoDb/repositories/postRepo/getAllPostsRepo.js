import Post from "../../database/entities/Post.js"

const getAllPostsRepo =  async (limit)=> {
    try{
        const posts = await Post.find({ hide: false }).sort({ createdAt: -1 }).limit(limit).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'User' // Assuming 'User' is the model name for the user schema
            }
        })
        return posts
    }catch(err){
        throw new Error(err.message);
    }
}

export default getAllPostsRepo

