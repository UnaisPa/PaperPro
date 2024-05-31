import Chat from "../../database/entities/Chat.js";
import Message from "../../database/entities/Message.js"

const saveMessageRepo = async(sender,content,chatId) =>{
    try{
        const newMessage = new Message({
            sender,
            content,
            chat:chatId
        })

        const setLatestMessage = await Chat.updateOne({_id:chatId},{$set:{latestMessage:newMessage._id}})
        const message = await newMessage.save();
        return message;
    }catch(err){
        throw new Error(err)
    }
}

export default saveMessageRepo;