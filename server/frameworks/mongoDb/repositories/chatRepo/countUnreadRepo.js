import Chat from "../../database/entities/Chat.js";
import Message from "../../database/entities/Message.js"

const countUnreadRepo = async (chatId) =>{
    try{
        // const unreadmessages = await Message.aggregate([
        //     { $match: {chat:chatId, Unread: true } }, // Match only unread messages
        //     { $group: { _id: '$chatId', count: { $sum: 1 } } } // Group by chatId and count unread messages
        // ]);
        const updateUnreadCount = await Chat.updateOne({_id:chatId},{$inc:{unreadCount:1}})
        console.log(updateUnreadCount)
        //return unreadmessages;
    }catch(err){
        throw new Error(err)
    }
}

export default countUnreadRepo;