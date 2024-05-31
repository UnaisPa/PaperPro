import Chat from "../../database/entities/Chat.js"

const getChatsRepo = async(id) =>{
    try{
        const chats = await Chat.find({users:{$in:[id]}}).populate('users').populate('latestMessage')
        return {success:true, chats:chats}

    }catch(err){
        throw new Error(err)
    }
}

export default getChatsRepo