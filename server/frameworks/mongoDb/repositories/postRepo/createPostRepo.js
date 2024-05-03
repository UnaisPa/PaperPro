import User from "../../database/entities/User.js";
import Post from "../../database/entities/Post.js";

const createPostRepo = async (userId,  content, mediaUrls ) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found!');
        }

        const newPost = await Post.create({
            user: userId,
            content: content,
            mediaUrls: mediaUrls
        });
        const post = await Post.findById(newPost._id)
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })

        const updateUser = await User.updateOne({ _id: userId }, { $push: { posts: newPost._id } });

        return { success: true, post: post, message: 'Your post has been successfully uploaded!' }
    } catch (err) {
        throw new Error(err.message);
    }
}

export default createPostRepo