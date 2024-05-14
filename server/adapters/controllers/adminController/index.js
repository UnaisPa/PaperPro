import authAdminController from "./authAdminController.js";

export default (dependencies) =>{
    return {
        authAdminController:authAdminController(dependencies)
    }
}