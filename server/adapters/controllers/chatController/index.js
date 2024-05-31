import createChatController from "./createChatController.js"
import getChatsController from "./getChatsController.js"
export default (dependencies) =>{
    return {
        createChatController:createChatController(dependencies),
        getChatsController:getChatsController(dependencies)
    }
}