//In repos, here we interacting with database. (here only); 

import User from "../../database/entities/User.js";
import { generateToken } from "../../../../utils/generateToken.js";
import { generateRefreshToken } from "../../../../utils/generateToken.js";
 const authUserRepo = async (res,email,password) =>{
    try{
        const user = await User.findOne({ email: email });
        if (user) {
            if (await user.matchPassword(password)) {
                const token = await generateToken(res, user._id);
                const refreshToken = await generateRefreshToken(res, user._id)

                //remove password from the response
                const { password: pass, ...rest } = user._doc;
                return {success:true, user: rest, token,refreshToken };
            } else {
                return {success:false, message: "Invalid password. Please try again." };
            }
        } else {
            return {success:false, message: "User not found. Please check your credentials." };
        }
    }catch(err){
        return {success:false,message:`Error occured, ${err}`}
    }
}

export default authUserRepo

