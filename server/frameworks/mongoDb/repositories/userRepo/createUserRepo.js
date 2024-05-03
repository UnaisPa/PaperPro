import User from "../../database/entities/User.js";
const createUserRepo = async (name, email, mobile, password) => {
    try{
        const newUser = new User({
            name,
            email,
            mobile,
            password,
        });
    
        await newUser.save();
        return { success: true, message: "Registration completed successfully. Please proceed to login." };
    
    }catch(err){
        return {success:false, message:`Registration failed! - ${err}`}
    }
}

export default createUserRepo