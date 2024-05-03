import User from "../../database/entities/User.js";
import { generateToken } from "../../../../utils/generateToken.js";

const googleAuthRepo = async (res, name, email) => {
    try {
        const user = await User.findOne({ email }).populate([
            {
                path: 'posts',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            },
            {
                path: 'posts',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                }
            }
        ]);
        if (user) {
            const token = await generateToken(res, user._id);

            //remove password from the response
            const { password: pass, ...rest } = user._doc;
            return {success:true, user: rest, token };
        } else {
            const newUser = new User({
                name: name,
                email: email,
                password: name.trim(),
            });

            await newUser.save();
            if (newUser) {
                const token = await generateToken(res, newUser._id);

                //remove password from the response
                const { password: pass, ...rest } = newUser._doc;
                return {success:true, user: rest, token };
            }
        }
    } catch (err) {
        return { success: false, message: `Authentication with Google Failed! - ${err.message}` }
    }
}

export default googleAuthRepo