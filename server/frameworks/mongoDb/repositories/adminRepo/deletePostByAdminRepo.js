import Post from "../../database/entities/Post.js"
const deletePostByAdminRepo = async(id) =>{
    try{
        const deletePost = await Post.deleteOne({_id:id});
        if(deletePost){
            return {success:true}
        }
    }catch(err){
        throw new Error(err)
    }
}

export default deletePostByAdminRepo