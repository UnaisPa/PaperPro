import { io } from "./app.js";
import { countUnreadUseCase, getChatsUseCase, markAsReadUseCase } from "./applications/useCases/index.js";
import dependencies from "./frameworks/config/dependencies.js";

// The socket io configuration for Chat system

const sockeIoConfig = () => {
    let users = [];

    io.on('connection', (socket) => {
        console.log('user connected for chatting');

        socket.on('initial', async (userId) => {
            //console.log('initial connection')

            const isUserExist = users.find((user) => user.userId === userId);
            if (!isUserExist) {
                const user = { userId, socketId: socket.id };
                users.push(user);
            }else{
                isUserExist.socketId = socket.id
            }
            
        })

        socket.on('start chat', async (chatId, userId) => {
            try {

                const isUserExist = users.find((user) => user.userId === userId);
                if (!isUserExist) {
                    const user = { userId, socketId: socket.id };
                    users.push(user);
                }
                isUserExist.socketId = socket.id
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

        socket.on('sendMessage', async ({ senderId, receiverId, content, chatId, user }) => {

            const receiver = users.find((user) => user.userId === receiverId);
            const sender = users.find((user) => user.userId === senderId);
            console.log('sender :>> ', sender);
            console.log('receiver :>> ', receiver);
            const { saveMessageUseCase } = dependencies.useCase
            await saveMessageUseCase(dependencies).executeFunction(senderId, content, chatId);
            if (receiver) {
                console.log('going in here');
                io.to(receiver?.socketId).to(sender.socketId).emit('getMessage', { sender: senderId, content, receiverId });
                //increment unreadCount; 
                await countUnreadUseCase(dependencies).executeFunction(chatId);
                const response = await getChatsUseCase(dependencies).executeFunction(receiverId);
                //console.log(response.chats);
                io.to(receiver?.socketId).emit('getChats', { chats: response.chats })
                let res = 0;
                response.chats.forEach((chat) => {
                    res += chat.unreadCount;
                })
                io.to(receiver?.socketId).emit('unreadCount', res)
            } else {
                console.log('ji');

                //increment unreadCount;
                await countUnreadUseCase(dependencies).executeFunction(chatId);
                //io.to(sender?.socketId)?.emit('getNotification', { sender:senderId, content, receiverId });

                io.to(sender?.socketId)?.emit('getMessage', { sender: senderId, content, receiverId });
                const response = await getChatsUseCase(dependencies).executeFunction(user);
                io.to(sender?.socketId)?.emit('getChats', { chats: response.chats })

                //console.log(response.chats);

            }
        });


        socket.on('disconnect', () => {
            console.log('Client disconnected from chatting');
        });
    })

}

export default sockeIoConfig