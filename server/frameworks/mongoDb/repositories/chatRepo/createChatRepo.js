import Chat from "../../database/entities/Chat.js"

const createChatRepo = async (userId, otherUserId) => {
    try {
        let chat = await Chat.findOne({ users: { $all: [userId, otherUserId] } })

        if (!chat) {
            // If no chat exists, create a new one
            chat = new Chat({
                users: [userId, otherUserId]
            });

            await chat.save();
        }

        return {chatId:chat._id}
    } catch (err) {
        throw new Error(err)
    }
}

export default createChatRepo