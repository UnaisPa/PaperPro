import express from "express";
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorHandler,notFound} from "./adapters/middlewares/errorMiddleware.js"
import userRoutes from "./adapters/routes/userRoutes.js";
import postRoutes from "./adapters/routes/postRoutes.js"
import adminRoutes from "./adapters/routes/adminRoutes.js";
import dependencies from "./frameworks/config/dependencies.js";
import {Server,Socket} from "socket.io"
import socketConfig from "./socket.js";
import http from "http"
const app = express();
import WebSocket from "ws"
const port = process.env.PORT || 8000

connectDB();
// export const io = new Server(5173, {
//     cors: { origin: 'https://localhost:5173' }
// });
// const server = http.createServer();
export const wss = new WebSocket.Server({ port:5050});

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
    origin: 'http://localhost:5173',
    credentials: true, // If frontend sends credentials (like cookies)
}));





//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//Routes
app.use('/api/users',userRoutes(dependencies));
app.use('/api/post',postRoutes(dependencies));
app.use('/api/admin',adminRoutes(dependencies))

//Error handler middlewares
app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})