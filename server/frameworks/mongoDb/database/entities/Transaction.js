import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    stockSymbol:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum: ['buy', 'sell'],
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    stockPrice:{
        type:Number,
        required:true
    },
    timeFrame:{
        type:String,
        enum:['intraday','tomorrow','one_week','one_month']
    },
    target:{
        type:Number
        //should greater than stock price
    },
    stopLoss:{
        type:Number
        //should less than stock price
    },
    profit:{
        //Profit&Loss
        type:Number
    },
    profilPercentage:{
        type:Number
    },
    active:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const Transaction = mongoose.model('Transaction',transactionSchema);
export default Transaction