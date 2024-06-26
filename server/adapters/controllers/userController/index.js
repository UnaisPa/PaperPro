import authUserController from "./authUserController.js";
import getUserByIdController from "./getUserByIdController.js";
import googleAuthController from "./googleAuthController.js";
import logoutUserController from "./logoutUserController.js";
import registerUserController from "./registerUserController.js";
import sentOtpController from "./sentOtpController.js";
import updateFollowListController from "./updateFollowListController.js";
import editProfileController from "./editProfileController.js";
import checkUsernameController from "./checkUsernameController.js";
import refreshTokenController from "./refreshTokenController.js";
import checkCPasswordController from "./checkCPasswordController.js";
import verifyOtpController from "./verifyOtpController.js";
import updatePasswordController from "./updatePasswordController.js";
import addWatchlistController from "./addWatchlistController.js";
import getWatchlistController from "./getWatchlistController.js";
import deleteWatchlistController from "./deleteWatchlistController.js";

export default (dependencies) =>{
    return {
        authUserController:authUserController(dependencies),
        getUserByIdController:getUserByIdController(dependencies),
        googleAuthController:googleAuthController(dependencies),
        registerUserController:registerUserController(dependencies),
        sentOtpController:sentOtpController(dependencies),
        updateFollowListController:updateFollowListController(dependencies),
        logoutUserController:logoutUserController(dependencies),
        editProfileController:editProfileController(dependencies),
        checkUsernameController:checkUsernameController(dependencies),
        refreshTokenController:refreshTokenController(dependencies),
        checkCPasswordController:checkCPasswordController(dependencies),
        verifyOtpController:verifyOtpController(dependencies),
        updatePasswordController:updatePasswordController(dependencies),
        addWatchlistController:addWatchlistController(dependencies),
        getWatchlistController:getWatchlistController(dependencies),
        deleteWatchlistController:deleteWatchlistController(dependencies),
    }
}