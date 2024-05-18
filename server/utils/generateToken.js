import jwt  from "jsonwebtoken";

export const generateToken = async (res, userId) =>{
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
            expiresIn:'30m'
        })

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure:true,
            maxAge:30 * 24 * 60 *1000
        });

        return token

    } catch (error) {
        console.error('Error generating token:', error);
    }
} 

export const generateRefreshToken = async(res,user) =>{
    try{
        const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_SECRET,{
            expiresIn:'30d'
        })
        
        return refreshToken

    }catch(err){
        console.error('Error generating refresh token:', err);
    }
}
