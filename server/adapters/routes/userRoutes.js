import express from 'express'
import { protect, verifyRefreshToken } from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController/index.js';




export default (dependencies) => {

    const { authUserController,
        getUserByIdController,
        googleAuthController,
        logoutUserController,
        registerUserController,
        sentOtpController,
        updateFollowListController,
        editProfileController,
        checkUsernameController,
        refreshTokenController,
        checkCPasswordController,
        verifyOtpController,
        updatePasswordController,
        addWatchlistController,
        getWatchlistController,
        deleteWatchlistController
    } = userController(dependencies)


    const router = express.Router();
    //console.log(authUser)
    router.post('/auth', authUserController)
    router.post('/register', sentOtpController)
    router.post('/resend_otp', sentOtpController);
    router.post('/verify_otp', registerUserController)
    router.post('/google_auth', googleAuthController);
    router.get('/profile', protect, getUserByIdController)
    router.post('/logout', logoutUserController)
    router.put('/update_follow_list', protect, updateFollowListController);
    router.put('/edit_profile/:id', protect, editProfileController)
    router.get('/check_username', protect, checkUsernameController);

    router.post('/refresh_token',refreshTokenController)

    router.post('/check_current_password',protect,checkCPasswordController);
    router.post('/verify_otp_forgotpassword',verifyOtpController);
    router.put('/update_password/:id',updatePasswordController);
    router.post('/add_to_watchlist',protect,addWatchlistController);
    router.get('/get_watchlist/:id',protect,getWatchlistController);
    router.delete('/delete_watchlist_item/:id',protect,deleteWatchlistController)

    return router
}



//export default router