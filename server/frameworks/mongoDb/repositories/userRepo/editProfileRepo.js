import User from "../../database/entities/User.js"
import bcrypt from "bcrypt"

const editProfileRepo = async(data,userId,profilePicture)=>{
    const {name,userName,bio,password} = data
    try{
        if(password.trim()!==''){
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
            await User.updateOne({_id:userId},{$set:{password:newPassword}});
            //console.log(newPassword);
        }
        profilePicture && await User.updateOne({_id:userId},{$set:{profilePicture:profilePicture}});
        bio && await User.updateOne({_id:userId},{$set:{bio:bio}});

        //console.log(name,userName,bio,profilePicture,userId);
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: { name, userName } }, { new: true });
        //console.log(updatedUser);
        return {success:true,user:updatedUser}

    }catch(err){
        throw new Error(err.message);
    }
}

export default editProfileRepo