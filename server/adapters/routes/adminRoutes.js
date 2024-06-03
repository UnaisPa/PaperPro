import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import adminController from "../controllers/adminController/index.js"

export default (dependencies) => {
    const { authAdminController,getAllUsersController,blockUserController,getPostsController,hidePostController,deletePostByAdminController,
        getReportedPostsController
     } = adminController(dependencies)

    const router = express.Router();
    
    router.post('/auth',authAdminController);
    router.get('/get_all_users',protect,getAllUsersController);
    router.put('/block_user/:name',protect,blockUserController)
    router.get('/get_all_posts',protect,getPostsController);
    router.put('/hide_post/:id',protect,hidePostController);
    router.delete('/delete_post/:id',protect,deletePostByAdminController)
    router.get('/get_all_reported_posts',protect,getReportedPostsController)
    return router

}