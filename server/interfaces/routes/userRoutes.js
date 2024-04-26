import express from 'express'
import  {authUser, registerUser,googleAuth, logoutUser, verfyOTP, getUserProfile}  from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/auth',authUser)
router.post('/register',registerUser)
router.post('/resend_otp',registerUser); 
router.post('/verify_otp',verfyOTP)
router.post('/google_auth',googleAuth);
router.get('/profile',protect,getUserProfile)
router.post('/logout',protect,logoutUser) 




 
export default router