import mongoose from "mongoose";
const portfolioSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    transactions:[{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Transaction'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Portfolio = mongoose.model('Portfolio',portfolioSchema);
export default Portfolio;