import { generateRefreshToken, generateToken } from "../../../../utils/generateToken.js";
import User from "../../database/entities/User.js";

const authAdminRepo = async(res,email,password) =>{
    try{
        //console.log(email,password);
        const admin = await User.findOne({ email: email,isAdmin:true});
        if (admin) {
             
            if (await admin.matchPassword(password)) {
                const token = await generateToken(res, admin._id);
                const refreshToken = await generateRefreshToken(res,admin._id);
                //remove password from the response
                const { password: pass, ...rest } = admin._doc;
                return {success:true, admin: rest, token, refreshToken };
            } else {
                //console.log('hi') 
                return {success:false, message: "Invalid password. Please try again." };
            }
        } else {
            return {success:false, message: "Admin not found. Please check your credentials." };
        }
    }catch(err){
        return {success:false,message:`Error occured, ${err}`}
    }
}

export default authAdminRepo