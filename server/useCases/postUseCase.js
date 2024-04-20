
class PostUseCase {
    constructor(PostModel, UserModel, CommentModel) {
        this.Post = PostModel;
        this.User = UserModel;
        this.Comment = CommentModel;
    }
    async createPost(userId, { content, mediaUrls }) {
        try {
            const user = await this.User.findById(userId);
            if (!user) {
                throw new Error('User not found!');
            }

            const newPost = await this.Post.create({
                user: userId,
                content: content,
                mediaUrls: mediaUrls
            });
            const post = await this.Post.findById(newPost._id)
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                })

            const updateUser = await this.User.updateOne({ _id: userId }, { $push: { posts: newPost._id } });

            return { success: true, post: post, message: 'Your post has been successfully uploaded!' }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAllPosts() {
        const posts = await this.Post.find({ hide: false }).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'User' // Assuming 'User' is the model name for the user schema
            }
        })
        return posts
    }

    async postAction(postId, action) {
        if (action == 'like') {
            await this.Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
            //console.log('liked')
            return { message: 'liked' }
        } else if (action == 'dislike') {

            await this.Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } }, { new: true });
            //console.log('disliked');
            return { message: 'disliked' }
        }
    }

    async createComment({ postId, userId, text }) {
        if (postId && userId) {
            const newComment = await this.Comment.create({
                text: text,
                user: userId,
            })

            const updatePost = await this.Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment._id } }, { new: true }).populate('user').populate({
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
    }
}

export default PostUseCase