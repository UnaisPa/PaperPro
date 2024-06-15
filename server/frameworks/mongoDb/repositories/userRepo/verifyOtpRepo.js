import { verfyOtp } from "../../../../helper/otpHelper.js";
import User from "../../database/entities/User.js";

const verifyOTPRepo = async (email, otp, from) => {
    try {
        const verify = await verfyOtp(email, otp);
        if (from == 'forgot_password') {
            const user = await User.findOne({ email: email });
            return { verify, userId: user._id }
        }else{
            return { verify }
        }

    } catch (err) {
        return { success: false, message: 'OTP verification failed', err: err.message }
    }
}

export default verifyOTPRepo