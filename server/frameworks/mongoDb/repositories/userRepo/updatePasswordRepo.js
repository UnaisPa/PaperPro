import User from "../../database/entities/User.js";
import bcrypt from "bcrypt"

const updatePasswordRepo = async(password,userId) =>{
    try{
        if(password.trim()!==''){
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
            await User.updateOne({_id:userId},{$set:{password:newPassword}});
            return {success:true,message:'Password updated!'}
            //console.log(newPassword);
        }else{
            return {success:false, message:'An error occured!'}
        }
    }catch(err){
        throw new Error(err)
    }
}

export default updatePasswordRepo