import User from "../../database/entities/User.js";

const getAllUsersRepo = async()=>{
    try{
        const users = await User.find({isAdmin:false});
        return {success:true,users}
    }catch(err){
        throw new Error(err)
    }
}

export default getAllUsersRepo