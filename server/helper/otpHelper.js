import { sendEmail } from "../frameworks/drivers/nodemailer.js";
const otpMap = new Map()
async function sendOtpEmail(email, otp) {
  const subject = "OTP Verification";
  const text = `Your OTP for registration is: ${otp}`;

  let expirationTime =  Date.now() + 5 * 60 * 1000 // 5 minutes
  otpMap.set(email, { otp, expirationTime });

  return sendEmail(email, subject, text);
}

async function verfyOtp(email,otp){
  const otpData = otpMap.get(email);
    if (!otpData || otpData.expirationTime < Date.now()) {
      //otpMap.delete(email);
      console.log('error')
      return {message:"The OTP has expired. Please request a new OTP."}; // OTP is expired or not found
    }
    
    if(otpData.otp === otp){
        otpMap.delete(email);
        return true
    }
    else{
      console.log('Something happened')
      return {message:"The entered OTP is incorrect. Please try again."};
    }
}

export {sendOtpEmail,verfyOtp}