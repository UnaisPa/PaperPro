import Chat from "../../database/entities/Chat.js";
import Message from "../../database/entities/Message.js"

const markAsReadRepo = async(chatId) =>{
    try{
        const markAsRead = await Message.updateMany({chat:chatId,Unread:true},{$set:{Unread:false}});
        const updateUnreadCount = await Chat.updateOne({_id:chatId},{$set:{unreadCount:0}})
        if(markAsRead && updateUnreadCount){
            return;
        }
    }catch(err){
        throw new Error(err)
    }
}

export default markAsReadRepo