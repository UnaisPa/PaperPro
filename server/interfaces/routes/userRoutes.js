import express from 'express'
import  {authUser, registerUser,googleAuth}  from '../controllers/userController.js';

const router = express.Router();

router.post('/auth',authUser)
router.post('/register',registerUser)
router.post('/google_auth',googleAuth);
 
export default router