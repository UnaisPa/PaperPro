import { verfyOtp } from "../../../../helper/otpHelper.js";
import User from "../../database/entities/User.js";

const verifyOTPRepo = async (email, otp) => {
    try {
        const verify = await verfyOtp(email, otp);
        const user = await User.findOne({email:email});
        return {verify,userId:user._id}
    } catch (err) {
        return { success: false, message: 'OTP verification failed', err: err.message }
    }
}

export default verifyOTPRepo