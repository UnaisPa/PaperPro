import authUserController from "./authUserController.js";
import getUserByIdController from "./getUserByIdController.js";
import googleAuthController from "./googleAuthController.js";
import logoutUserController from "./logoutUserController.js";
import registerUserController from "./registerUserController.js";
import sentOtpController from "./sentOtpController.js";
import updateFollowListController from "./updateFollowListController.js";

export default (dependencies) =>{
    return {
        authUserController:authUserController(dependencies),
        getUserByIdController:getUserByIdController(dependencies),
        googleAuthController:googleAuthController(dependencies),
        registerUserController:registerUserController(dependencies),
        sentOtpController:sentOtpController(dependencies),
        updateFollowListController:updateFollowListController(dependencies),
        logoutUserController:logoutUserController(dependencies)
    }
}