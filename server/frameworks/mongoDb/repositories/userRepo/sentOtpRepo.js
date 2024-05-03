import User from "../../database/entities/User.js";
import { generateOTP } from "../../../../helper/otpGenarator.js";
import { sendOtpEmail } from "../../../../helper/otpHelper.js";

const sendOtpRepo = async ( email ) => {
    try {
        const existUser = await User.findOne({ email });

        //Checking if user account is existing or not
        if (existUser) {
            return { success: false, message: "User already exist" };
        } else {
            const otp = generateOTP()
            sendOtpEmail(email, otp)
            return { success: true, message: `OTP sent to your email successfully.` }
        }
    } catch (err) {
        return { success: false,message:`An error encountered, ${err}` }
    }
}

export default sendOtpRepo