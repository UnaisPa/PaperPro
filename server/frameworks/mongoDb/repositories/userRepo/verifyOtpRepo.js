import { verfyOtp } from "../../../../helper/otpHelper.js";

const verifyOTPRepo = async (email, otp) => {
    try {
        return await verfyOtp(email, otp);
    } catch (err) {
        return { success: false, message: 'OTP verification failed', err: err.message }
    }
}

export default verifyOTPRepo