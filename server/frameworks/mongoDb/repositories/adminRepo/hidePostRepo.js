import Post from "../../database/entities/Post.js"

const hidePostRepo = async (postId, type) => {
    try {
        if (type == 'hide') {
            const hidePost = await Post.updateOne({ _id: postId }, { $set: { hide: true } });
            if (hidePost) {
                return { success: true }
            }
        }else{
            const unHidePost = await Post.updateOne({ _id: postId }, { $set: { hide: false } });
            if (unHidePost) {
                return { success: true }
            } 
        }

    } catch (err) {
        throw new Error(err)
    }
}

export default hidePostRepo