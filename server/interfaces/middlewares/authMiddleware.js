import jwt from "jsonwebtoken"
import User from "../../entities/User"
import expressAsyncHandler from "express-async-handler"

const protect = expressAsyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
        }catch(err){
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, invalid token')
    }
})

export {protect}