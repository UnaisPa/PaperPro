import express from "express";
import { protect } from '../middlewares/authMiddleware.js';
import PostController from "../controllers/postController.js";

const router = express.Router();

//instance for PostController
const postController = new PostController();

//User side
router.post('/create_post/:id',protect,postController.createPost);
router.get('/get_all_posts',protect,postController.getAllPosts);

export default router
