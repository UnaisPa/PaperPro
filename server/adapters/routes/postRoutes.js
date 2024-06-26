import express from "express";
import { protect } from '../middlewares/authMiddleware.js';
// import PostController from "../controllers/postController.js";
// const postControl = new PostController();
import postController from "../controllers/postController/index.js";

export default (dependencies) => {

    const {createCommentController,createPostController,getAllPostsController,postActionController,deletePostController,savePostController,getSavedPostsController,getLikedUsersController,
        createReportPostController
    } = postController(dependencies)

    const router = express.Router();

    //User side
    router.post('/create_post/:id', protect, createPostController);
    router.get('/get_all_posts', protect, getAllPostsController); 
    //Like or Dislike
    router.put('/post_action/:id', protect,postActionController);
    
    router.post('/add_comment', protect, createCommentController);
    router.delete('/delete_post/:id',protect,deletePostController);
    router.post('/save_post',protect,savePostController)
    router.get('/saved_posts/:id',protect,getSavedPostsController);
    router.get('/get_liked_users/:id',protect,getLikedUsersController);
    router.post('/report_post/:id',protect,createReportPostController)

    return router
}
