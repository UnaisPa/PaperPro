import User from "../../database/entities/User.js";
const updateFollowListRepo = async (currentUserId, userId, action) => {

    // Assuming 'User' is your Mongoose model for users
    const currentUser = await User.findById(currentUserId);
    const userToFollow = await User.findById(userId);

    if (action == 'follow') {
        

        // Update the 'followers' array of the user being followed
        userToFollow.followers.push(currentUser._id);
        //console.log(userToFollow.followers[0]);
        await userToFollow.save();

        // Update the 'following' array of the current user
        currentUser.following.push(userToFollow._id);
        await currentUser.save();
    }

    if(action=='unfollow'){
        userToFollow.followers.pull(currentUser._id);
        await userToFollow.save();

        currentUser.following.pull(userToFollow._id);
        await currentUser.save();
    }

    return currentUser

}

export default updateFollowListRepo