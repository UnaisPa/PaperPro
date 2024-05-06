import User from "../../database/entities/User.js";
const updateFollowListRepo = async (currentUserId, userId) => {
    // Assuming 'User' is your Mongoose model for users
    const currentUser = await User.findById(currentUserId);
    const userToFollow = await User.findById(userId);

    // Update the 'followers' array of the user being followed
    userToFollow.followers.push(currentUser._id);
    //console.log(userToFollow.followers[0]);
    await userToFollow.save();

    // Update the 'following' array of the current user
    currentUser.following.push(userToFollow._id);
    await currentUser.save();

    return currentUser

}

export default updateFollowListRepo