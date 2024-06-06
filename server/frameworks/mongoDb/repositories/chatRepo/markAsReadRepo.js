import Message from "../../database/entities/Message.js"

const markAsReadRepo = async(chatId) =>{
    try{
        const markAsRead = await Message.updateMany({chat:chatId,Unread:true},{$set:{Unread:false}});
        if(markAsRead){
            return;
        }
    }catch(err){
        throw new Error(err)
    }
}

export default markAsReadRepo