import jwt from "jsonwebtoken"
import User from "../../frameworks/mongoDb/database/entities/User.js"
import expressAsyncHandler from "express-async-handler"

export const protect = expressAsyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    //console.log(token) 

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select('-password');
            if (!user) { return res.status(401); }
            next();

        } catch (err) {
            //console.log(err, 'ERROR FROM INTERSEPTER');
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, invalid token')
    }
})

export const verifyRefreshToken = expressAsyncHandler((async (req, res) => {
    //const authHeader = req.headers.authorization;
    //const token = authHeader.split(' ')[1];
    //console.log(token) 

    //const {token} = req.body
    const { refreshToken } = req.session;
    //console.log("refresh Token,", refreshToken)
    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();

        } catch (err) {
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(400)
        throw new Error('Token not found')
    }
}))

