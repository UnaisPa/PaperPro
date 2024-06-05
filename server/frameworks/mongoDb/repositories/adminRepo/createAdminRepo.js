import User from "../../database/entities/User.js";

const createAdminRepo = async(data,profilePicture)=>{
    try{
        const {name,email,password,position} = data;
        console.log(name,email,password,position,profilePicture);

        const newAdmin = new User({
            name,
            email,
            password,
            isAdmin:true,
            profilePicture:profilePicture!==undefined?profilePicture:''
        });

        await newAdmin.save();
        return {success:true}
    }catch(err){
        throw new Error(err)
    }
}

export default createAdminRepo