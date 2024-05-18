import express from 'express'
import { protect,verifyRefreshToken } from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController/index.js';


import { generateToken } from '../../utils/generateToken.js';

export default (dependencies) => {

    const { authUserController,
        getUserByIdController,
        googleAuthController,
        logoutUserController,
        registerUserController,
        sentOtpController,
        updateFollowListController,
        editProfileController,
        checkUsernameController
    } = userController(dependencies)


    const router = express.Router();
    //console.log(authUser)
    router.post('/auth', authUserController)
    router.post('/register', sentOtpController)
    router.post('/resend_otp', sentOtpController);
    router.post('/verify_otp', registerUserController)
    router.post('/google_auth', googleAuthController);
    router.get('/profile', protect, getUserByIdController)
    router.post('/logout', protect, logoutUserController)
    router.put('/update_follow_list', protect, updateFollowListController);
    router.put('/edit_profile/:id',protect,editProfileController)
    router.get('/check_username',protect,checkUsernameController);

    router.post('/refresh_token',verifyRefreshToken,(req,res)=>{
        const {user} = req.body
        const token = generateToken(res,user);
        console.log("refresh token",token)
        res.json(token);
    })

    return router
}



//export default router