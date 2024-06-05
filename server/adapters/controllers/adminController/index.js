import authAdminController from "./authAdminController.js";
import getAllUsersController from "./getAllUsersController.js";
import blockUserController from "./blockUserController.js";
import getPostsController from "./getPostsController.js";
import hidePostController from "./hidePostController.js";
import deletePostByAdminController from "./deletePostByAdminController.js";
import getReportedPostsController from "./getReportedPostsController.js";
import getUserPortfolioController from "./getUserPortfolioController.js";
import getAdminsController from "./getAdminsController.js";
import createAdminController from "./createAdminController.js";
export default (dependencies) =>{
    return {
        authAdminController:authAdminController(dependencies),
        getAllUsersController:getAllUsersController(dependencies),
        blockUserController:blockUserController(dependencies),
        getPostsController:getPostsController(dependencies),
        hidePostController:hidePostController(dependencies),
        deletePostByAdminController:deletePostByAdminController(dependencies),
        getReportedPostsController:getReportedPostsController(dependencies),
        getUserPortfolioController:getUserPortfolioController(dependencies),
        getAdminsController:getAdminsController(dependencies),
        createAdminController:createAdminController(dependencies)
    }
}