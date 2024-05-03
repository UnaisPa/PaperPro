import User from "../frameworks/mongoDb/database/entities/User.js";
import { generateToken } from "../utils/generateToken.js";
import { sendOtpEmail, verfyOtp } from "../helper/otpHelper.js";
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
    async sendOTP({ email }) {
        const existUser = await User.findOne({ email });

        //Checking if user account is existing or not
        if (existUser) {
            return { success: false, message: "User already exist" };
        } else {
            const otp = generateOTP()
            sendOtpEmail(email, otp)
            return { success: true, message: `OTP sent to your email successfully.` }
        }
    }

    async verfyOTP(email, otp) {
        try {
            return await verfyOtp(email, otp);
        } catch (err) {
            return { success: false, message: 'OTP verification failed', err: err.message }
        }
    }


    async createUser(name, email, mobile, password) {

        const newUser = await new User({
            name,
            email,
            mobile,
            password,
        });

        await newUser.save();
        return { success: true, message: "Registration completed successfully. Please proceed to login." };
    }

    async getUserById(userId) {
        const user = await User.findById(userId).populate([
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
        // console.log(user.posts)
        return user
    }

    async googlAuth(res, { name, email }) {
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

    async updateFollowList({currentUserId, userId}) {
        // Assuming 'User' is your Mongoose model for users
        const currentUser = await User.findById(currentUserId);
        const userToFollow = await User.findById(userId);

        // Update the 'followers' array of the user being followed
        userToFollow.followers.push(currentUser._id);
        await userToFollow.save();

        // Update the 'following' array of the current user
        currentUser.following.push(userToFollow._id);
        await currentUser.save();

        return currentUser

    }
}

export default UserUseCases;
