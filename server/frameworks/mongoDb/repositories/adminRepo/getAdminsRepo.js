import User from "../../database/entities/User.js"

const getAdminsRepo = async() =>{
    try{
        const admins = await User.find({isAdmin:true});
        return {success:true,admins:admins}
    }catch(err){
        throw new Error(err)
    }
}

export default getAdminsRepo;