import User from "../../database/entities/User.js"

const checkUsernameRepo = async (user) =>{
    try{
        const isAvailable = await User.findOne({userName:user});
        if(isAvailable){
            return {success:false}
        }else{
            return {success:true}
        }
    }catch(err){
        throw new Error(err.message)
    }
}

export default checkUsernameRepo