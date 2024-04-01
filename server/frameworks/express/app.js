import express from "express";
import connectDB from "../../config/config.js";
import cookieParser from "cookie-parser";
import { errorHandler,notFound} from "../../middlewares/errorMiddleware.js";
const app = express();

const port = process.env.PORT || 8000

connectDB()

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//Routes


//Error handler middlewares
app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})