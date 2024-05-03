import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController/index.js';


import { registerUser, googleAuth, logoutUser, verfyOTP, getUserProfile, updateFollowList } from '../controllers/userController.js';

export default (dependencies) => {

    const { authUserController,
        getUserByIdController,
        googleAuthController,
        logoutUserController,
        registerUserController,
        sentOtpController,
        updateFollowListController
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
    return router
}



//export default router