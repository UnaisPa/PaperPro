import expressAsyncHandler from "express-async-handler"
import User from "../../../frameworks/mongoDb/database/entities/User.js";
import jwt from "jsonwebtoken"

export default (dependencies) =>{
    const refreshTokenController = expressAsyncHandler(async(req,res)=>{
        //const user = req.session.userId;
        const { refreshToken } = req.session;
        //console.log(refreshToken)
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                const user = await User.findById(decoded.user)
                const token = await generateToken(res, user._id);

                res.cookie('jwt', token, {
                    httpOnly: true,
                    sameSite: 'Strict',
                    secure: true,
                    maxAge: 30 * 24 * 60 * 1000
                });

                return res.status(200).json({ token })
            } catch (err) {
                 res.status(401);
                 //throw new Error('Not authorized, invalid token')
            }
        } else {
             res.status(400)
             //throw new Error('Token not found')
        }

   
    })
    return refreshTokenController
}