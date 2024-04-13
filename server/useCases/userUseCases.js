import User from "../entities/User.js";
import { generateToken } from "../utils/generateToken.js";
import { sendOtpEmail,verfyOtp } from "./otpUseCase.js";
import { generateOTP } from "../helper/otpGenarator.js";
class UserUseCases {
  
  async authUser(res, email, password) {
    const user = await User.findOne({ email: email });
    if (user) {
      if (await user.matchPassword(password)) {
        const token = await generateToken(res, user._id);

        //remove password from the response
        const { password: pass, ...rest } = user._doc;
        return { user: rest, token };
      } else {
        return { message: "Invalid password. Please try again." };
      }
    } else {
      return { message: "User not found. Please check your credentials." };
    }
  }

  // Sending OTP to User's email
  async sendOTP({email}){
    const existUser = await User.findOne({ email });

    //Checking if user account is existing or not
    if (existUser) {
      return {success:false, message: "User already exist" };
    }else{
      const otp = generateOTP()
      sendOtpEmail(email,otp)
      return {success:true, message:`OTP sent to your email successfully.`}
    }
  }

  async verfyOTP(email,otp){
    try{
     return await verfyOtp(email,otp);  
    }catch(err){
      return {success:false,message:'OTP verification failed', err:err.message}
    }
  }


  async createUser( name, email, mobile, password ) {

    const newUser = await new User({
      name,
      email,
      mobile,
      password,
    });

    await newUser.save();
    return {success:true, message: "Registration completed successfully. Please proceed to login." };
  }

  async googlAuth(res,{ name, email }) {
    const user = await User.findOne({ email });
    if (user) {
      const token = await generateToken(res, user._id);

      //remove password from the response
      const { password: pass, ...rest } = user._doc;
      return { user: rest, token };
    } else {
      const newUser = await new User({
        name: name,
        email: email,
        password: name.trim(),
      });

      await newUser.save();
      if (newUser) {
        const token = await generateToken(res, newUser._id);

        //remove password from the response
        const { password: pass, ...rest } = newUser._doc;
        return { user: rest, token };
      }
    }
  }
}

export default UserUseCases;
