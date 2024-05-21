import authAdminController from "./authAdminController.js";
import getAllUsersController from "./getAllUsersController.js";
import blockUserController from "./blockUserController.js";
export default (dependencies) =>{
    return {
        authAdminController:authAdminController(dependencies),
        getAllUsersController:getAllUsersController(dependencies),
        blockUserController:blockUserController(dependencies)
    }
}