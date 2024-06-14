import express from "express";
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors"
 import MongoDBStore from "connect-mongodb-session"
 import session, { MemoryStore } from "express-session";
//  let mongoStore = (MongoDBStore)(session)
import { errorHandler, notFound } from "./adapters/middlewares/errorMiddleware.js"
import userRoutes from "./adapters/routes/userRoutes.js";
import postRoutes from "./adapters/routes/postRoutes.js"
import adminRoutes from "./adapters/routes/adminRoutes.js";
import portfolioRoutes from "./adapters/routes/portfolioRoutes.js";
import chatRoutes from "./adapters/routes/chatRoutes.js";
import path from "path";
import dependencies from "./frameworks/config/dependencies.js";
import { Server, Socket } from "socket.io"
import socketConfig from "./socket.js";
import sockeIoConfig from "./socketIo.js";
import http from "http"
const app = express(); 
const store = new MemoryStore();
import WebSocket from "ws"
const port = process.env.PORT || 8000

connectDB();

export const io = new Server(5252, {
    cors: { origin: 'https://paperpro.site' }
});
 sockeIoConfig()
// const server = http.createServer();
export const wss = new WebSocket.Server({ port: 5050 });

// export const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5174',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['my-custom-header'],
//     credentials: true
//   }
// });  

socketConfig()

app.use(cors({
    origin: 'https://paperpro.site',
    credentials: true, // If frontend sends credentials (like cookies)
}));
 

// var store = new mongoStore(
//     {
//         uri: process.env.MONGO,
//         databaseName: 'paperPro',
//         collection: 'mySessions'
//     });

// store.on('error', function (error) {
//     throw new Error(error)
//     // get an error here
// });

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
//app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 ,// 1 week
        //httpOnly: true,
    },
    store: store,
    resave: false,
    saveUninitialized: true,
}))



//Routes
app.use('/api/users', userRoutes(dependencies));
app.use('/api/post', postRoutes(dependencies));
app.use('/api/admin', adminRoutes(dependencies));
app.use('/api/portfolio', portfolioRoutes(dependencies));
app.use('/api/chat',chatRoutes(dependencies));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
//   });

//Error handler middlewares
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`server is running on port:${port}`)
})