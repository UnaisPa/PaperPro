import User from "../entities/User.js";
import { generateToken } from "../utils/generateToken.js";

class UserUseCases{
    async authUser(res,email,password){
        const user = await User.findOne({email:email})
        if(user){
            if(await user.matchPassword(password)){
                generateToken(res,user);
                return {user:user}
            }else{
                return {message:'Invalid password. Please try again.'}
            }
        }else{
            return {message:'User not found. Please check your credentials.'}
        }
    }
    async createUser({name,email,mobile,password}){
        const existUser = await User.findOne({email});

        //Checking if user account is existing or not
        if(existUser){
            return {"message":'User already exist'}
        }

        const newUser = await new User({
            name,
            email,
            mobile,
            password
        })
        
        await newUser.save();
        return {"message":'User created successfully'}
    }

}

export default UserUseCases