import { io } from "./app.js";
import dependencies from "./frameworks/config/dependencies.js";

// The socket io configuration for Chat system

const sockeIoConfig = () => {
    let users = [];

    io.on('connection', (socket) => {
        //console.log('user connected for chatting');

        socket.on('start chat', async (chatId, userId) => {
            try {

                const isUserExist = users.find((user) => user.userId === userId);
                if (!isUserExist) {
                    const user = { userId, socketId: socket.id };
                    users.push(user);
                }
                isUserExist.socketId =socket.id
                // Fetch all messages for the chat
                const { getChatHistoryUseCase } = dependencies.useCase;
                const messages = await getChatHistoryUseCase(dependencies).executeFunction(chatId);

                // Emit the messages to the client
                socket.emit('chat history', messages);
            } catch (error) {
                socket.emit('chat history', [])
                //console.error('Error fetching chat history:', error);
            }
        });

        socket.on('sendMessage', async ({ senderId, receiverId, content,chatId }) => {
            
            const receiver = users.find((user) => user.userId === receiverId);
            const sender = users.find((user) => user.userId === senderId);
            console.log('sender :>> ', sender);
            console.log('receiver :>> ', receiver);
            const {saveMessageUseCase} = dependencies.useCase
            await saveMessageUseCase(dependencies).executeFunction(senderId,content,chatId);
            if (receiver) {
                console.log('going in here');
                io.to(receiver?.socketId).to(sender.socketId).emit('getMessage', { sender:senderId, content, receiverId });
            } else {
                console.log('ji')
                io.to(sender?.socketId)?.emit('getMessage', { sender:senderId, content, receiverId });
            }
        });


        socket.on('disconnect', () => {
            console.log('Client disconnected from chatting');
        });
    })

}

export default sockeIoConfig