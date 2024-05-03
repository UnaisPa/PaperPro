import createCommentController from "./createCommentController.js";
import getAllPostsController from "./getAllPostsController.js";
import createPostController from "./createPostController.js";

export default (dependencies) =>{
    return {
        createCommentController:createCommentController(dependencies),
        getAllPostsController:getAllPostsController(dependencies),
        createPostController:createPostController(dependencies)
    }
}