import User from "../../database/entities/User.js";
const getUserByIdRepo = async (userId) =>{
    try{
        
        const user = await User.findById(userId).populate([
            {
                path: 'posts',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            },
            {
                path: 'posts',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                }
            }
        ]);
        // console.log(user.posts)
        return {success:true,user:user}
    }catch(err){
        return {success:false,message:err.message}
    }
}

export default getUserByIdRepo