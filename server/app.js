import express from "express";
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorHandler,notFound} from "./adapters/middlewares/errorMiddleware.js"
import userRoutes from "./adapters/routes/userRoutes.js";
import postRoutes from "./adapters/routes/postRoutes.js"
import dependencies from "./frameworks/config/dependencies.js";
const app = express();

const port = process.env.PORT || 8000

connectDB()
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

//Error handler middlewares
app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})