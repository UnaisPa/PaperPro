import createChatController from "./createChatController.js"
import getChatsController from "./getChatsController.js"
import markAsReadController from "./markAsReadController.js"
export default (dependencies) =>{
    return {
        createChatController:createChatController(dependencies),
        getChatsController:getChatsController(dependencies),
        markAsReadController:markAsReadController(dependencies),
    }
}