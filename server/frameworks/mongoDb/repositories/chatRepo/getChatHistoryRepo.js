import Message from "../../database/entities/Message.js"

const getChatHistoryRepo = async (chatId) =>{
    try{   
        const chatHistory = await Message.find({chat:chatId}).sort({createdAt:1});
        return chatHistory;

    }catch(err){
        throw new Error(err)
    }
}

export default getChatHistoryRepo