import User from "../entities/User.js";

class UserUseCases{
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