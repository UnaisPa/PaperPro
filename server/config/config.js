import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const uri = process.env.MONGO
const connectDB = async () => {
    try {
        await mongoose.connect(uri).then(() => {
            console.log('MongoDB is connected');
        }).catch((err) => {
            console.log('Error while connecting mongodb', err)
        })
    } catch (err) {
        console.log(`Error occured when connecting mongodb :${err}`)
    }
}

export default connectDB
