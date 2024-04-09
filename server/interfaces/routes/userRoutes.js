import express from 'express'
import  {authUser, registerUser,googleAuth, logoutUser}  from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/auth',authUser)
router.post('/register',registerUser)
router.post('/google_auth',googleAuth);
router.post('/logout',protect,logoutUser)
 
export default router