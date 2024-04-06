import express from "express";
import connectDB from "../../config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorHandler,notFound} from "../../interfaces/middlewares/errorMiddleware.js";
import userRoutes from "../../interfaces/routes/userRoutes.js"
const app = express();

const port = process.env.PORT || 8000

connectDB()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // If your frontend sends credentials (like cookies)
}));

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//Routes
 app.use('/api/users',userRoutes)

//Error handler middlewares
app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})