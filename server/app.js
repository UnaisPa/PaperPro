import express from "express";
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import MongoDBStore from "connect-mongodb-session";
import session, { MemoryStore } from "express-session";
import { errorHandler, notFound } from "./adapters/middlewares/errorMiddleware.js";
import userRoutes from "./adapters/routes/userRoutes.js";
import postRoutes from "./adapters/routes/postRoutes.js";
import adminRoutes from "./adapters/routes/adminRoutes.js";
import portfolioRoutes from "./adapters/routes/portfolioRoutes.js";
import chatRoutes from "./adapters/routes/chatRoutes.js";
import path from "path";
import dependencies from "./frameworks/config/dependencies.js";
import { Server } from "socket.io";
//import socketConfig from "./socket.js";
import sockeIoConfig from "./socketIo.js";
import http from "http";

const app = express();
const port = process.env.PORT || 5000;

// Create an HTTP server
const server = http.createServer(app);

// Connect to the database
connectDB();

// Initialize Socket.IO with the HTTP server
export const io = new Server(server, {
    cors: { origin: 'https://paperpro.site' }
});
sockeIoConfig(io); // Pass the Socket.IO instance to your config

// Middleware
app.use(cors({
    origin: 'https://paperpro.site',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: new MemoryStore(),
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/api/users', userRoutes(dependencies));
app.use('/api/post', postRoutes(dependencies));
app.use('/api/admin', adminRoutes(dependencies));
app.use('/api/portfolio', portfolioRoutes(dependencies));
app.use('/api/chat', chatRoutes(dependencies));

// Error handler middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//socketConfig(io); // Call your socket configuration
