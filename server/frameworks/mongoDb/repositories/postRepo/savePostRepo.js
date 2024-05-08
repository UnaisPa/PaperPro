import SavedPosts from "../../database/entities/SavedPosts.js"

const savePostRepo = async (userId, postId, action) => {
    try {
        //console.log(userId,postId)
        let userSavedPosts = await SavedPosts.findOne({ user: userId });
        //let newSavedPosts;

        if (action === 'unsave') {
            await userSavedPosts.posts.pull(postId)
            //userSavedPosts.posts.push(postId)
            await userSavedPosts.save();
            return { success: true, message: 'Post Unsaved!' }

        } else {
            if (!userSavedPosts) {
                userSavedPosts = await SavedPosts.create({
                    user: userId,
                    posts: [postId]
                })
            } else {
                const check = userSavedPosts.posts.includes(postId)
                if (check) {
                    return { success: false, message: 'Post already saved!' }
                }
                userSavedPosts.posts.push(postId)
            }

            await userSavedPosts.save();
            return { success: true, message: 'Post saved successfully!' }
        }

    } catch (err) {
        throw new Error(err)
    }
}

export default savePostRepo