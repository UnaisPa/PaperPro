import createCommentController from "./createCommentController.js";
import getAllPostsController from "./getAllPostsController.js";
import createPostController from "./createPostController.js";
import postActionController from "./postActionController.js";
import deletePostController from "./deletePostController.js";
import savePostController from "./savePostController.js";
export default (dependencies) =>{
    return {
        createCommentController:createCommentController(dependencies),
        getAllPostsController:getAllPostsController(dependencies),
        createPostController:createPostController(dependencies),
        postActionController:postActionController(dependencies),
        deletePostController:deletePostController(dependencies),
        savePostController:savePostController(dependencies),
    }
}