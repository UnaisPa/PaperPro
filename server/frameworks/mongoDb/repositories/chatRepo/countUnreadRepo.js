import Message from "../../database/entities/Message.js"

const countUnreadRepo = async (chatId) =>{
    try{
        const unreadmessages = await Message.aggregate([
            { $match: {chat:chatId, Unread: true } }, // Match only unread messages
            { $group: { _id: '$chatId', count: { $sum: 1 } } } // Group by chatId and count unread messages
        ]);
        return unreadmessages;
    }catch(err){
        throw new Error(err)
    }
}

export default countUnreadRepo;