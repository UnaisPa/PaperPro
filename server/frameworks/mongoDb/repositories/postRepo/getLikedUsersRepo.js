import Post from "../../database/entities/Post.js"
import User from "../../database/entities/User.js";

const getLikedUsersRepo = async (postId) =>{
    const post = await Post.findById(postId)
    const likedUsers = post.likes;
    const getAllLikedUsers = await User.find({ _id: { $in: likedUsers } }) 
    //console.log(getAllLikedUsers);
    //return {message:'Success'}
    return {success:true,users:getAllLikedUsers}
}

export default getLikedUsersRepo