import User from "../../database/entities/User.js"

const checkCPasswordRepo = async (userId,password) =>{
    try{
        const user = await User.findById(userId)
        if (user) {
            if (await user.matchPassword(password)) {
                return {success:true, isPasswordTrue:true}
            }else{
                return {success:false, isPasswordTrue:false}
            }
        }else{
            return {success:false,message:'User not found!'}
        }
    }catch(err){
        throw new Error(err)
    }
}

export default checkCPasswordRepo