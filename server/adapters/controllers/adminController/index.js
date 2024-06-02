import authAdminController from "./authAdminController.js";
import getAllUsersController from "./getAllUsersController.js";
import blockUserController from "./blockUserController.js";
import getPostsController from "./getPostsController.js";
import hidePostController from "./hidePostController.js";
export default (dependencies) =>{
    return {
        authAdminController:authAdminController(dependencies),
        getAllUsersController:getAllUsersController(dependencies),
        blockUserController:blockUserController(dependencies),
        getPostsController:getPostsController(dependencies),
        hidePostController:hidePostController(dependencies),
    }
}