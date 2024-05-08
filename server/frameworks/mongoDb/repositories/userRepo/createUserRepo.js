import User from "../../database/entities/User.js";
const createUserRepo = async (name, email, mobile, password) => {
    try {
        let userName = name.split(" ")[0];
        userName=userName.toLowerCase()
        const checkUsernameAlreadyTaken = await User.findOne({ userName: userName });
        if (checkUsernameAlreadyTaken) {
            const num = Math.random()
                .toString()
                .slice(2, 4 );
            userName=userName+num
        }
        const newUser = new User({
            name,
            email,
            mobile,
            password,
            userName
        });

        await newUser.save();
        return { success: true, message: "Registration completed successfully. Please proceed to login." };

    } catch (err) {
        return { success: false, message: `Registration failed! - ${err}` }
    }
}

export default createUserRepo