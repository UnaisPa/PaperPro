
import Comment from "../../database/entities/Comment.js"
import Post from "../../database/entities/Post.js"

const createCommentRepo = async (postId, userId, text) => {
    try {
        if (postId && userId) {
            const newComment = await Comment.create({
                text: text,
                user: userId,
            })

            const updatePost = await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment._id } }, { new: true }).populate('user').populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User' // Assuming 'User' is the model name for the user schema
                }
            })
            if (updatePost) {
                return updatePost
            }
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export default createCommentRepo