import User from "../entities/User.js";
import { generateToken } from "../utils/generateToken.js";

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
  async createUser({ name, email, mobile, password }) {
    const existUser = await User.findOne({ email });

    //Checking if user account is existing or not
    if (existUser) {
      return { message: "User already exist" };
    }

    const newUser = await new User({
      name,
      email,
      mobile,
      password,
    });

    await newUser.save();
    return { message: "User created successfully" };
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
