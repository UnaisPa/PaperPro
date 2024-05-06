import Post from "../../database/entities/Post.js"
import User from "../../database/entities/User.js";

const deletePostRepo = async(postId)=>{
    try{
        const deletedPost = await Post.findByIdAndDelete(postId);
        const userId = deletedPost.user
        const user = await User.findById(userId);
        const remove = await user.posts.pull(postId);
        if(deletedPost&&remove){
            return {success:true,message:'Post deleted successfully'}
        }else{
            console.log('Post not found!')
            return {success:false}
        }
    }catch(err){
        throw new Error(err)
    }
}

export default deletePostRepo