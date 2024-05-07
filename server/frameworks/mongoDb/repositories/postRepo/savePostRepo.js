import SavedPosts from "../../database/entities/SavedPosts.js"

const savePostRepo = async (userId, postId) => {
    try {
        //console.log(userId,postId)
        let userSavedPosts = await SavedPosts.findOne({ user: userId });
        //let newSavedPosts;
        if (!userSavedPosts) {
            userSavedPosts = await SavedPosts.create({
                user:userId,
                posts:[postId]
            })
        }else{
            const check = userSavedPosts.posts.includes(postId)
            if(check){
                return {success:false,message:'Post already saved!'}
            }
            userSavedPosts.posts.push(postId)
        }
        
        await userSavedPosts.save();
        return {success:true,message:'Post saved successfully!'}
        
    } catch (err) {
        throw new Error(err)
    }
}

export default savePostRepo