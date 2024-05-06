import Post from "../../database/entities/Post.js";

const postActionRepo = async (postId,action,userId) =>{
    try{
        const post = await Post.findById(postId);
        if (action == 'like') {

            post.likes.push(userId)
            await post.save()
            // console.log('liked')
            return {success:true, message: 'liked' }

        } else if (action == 'dislike') {

            post.likes.pull(userId);
            await post.save()
            return {success:true, message: 'disliked' }
        }
    }catch(err){
        throw new Error(err.message);
    }
}

export default postActionRepo