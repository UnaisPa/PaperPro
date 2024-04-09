import jwt from "jsonwebtoken"
import User from "../../entities/User.js"
import expressAsyncHandler from "express-async-handler"

export const protect = expressAsyncHandler(async(req,res,next)=>{
    //let token;
    //token = req.cookies.jwt
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    //console.log(token) 

    if(token){ 
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }catch(err){
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, invalid token')
    }
})

