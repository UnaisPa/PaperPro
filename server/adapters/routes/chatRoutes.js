import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import chatController from "../controllers/chatController/index.js";

export default (dependencies) => {
    const router = express.Router();
    const {createChatController,getChatsController} = chatController(dependencies);
    
    router.post('/create_chat',protect,createChatController)
    router.get('/get_chats/:id',protect,getChatsController)
    return router

}