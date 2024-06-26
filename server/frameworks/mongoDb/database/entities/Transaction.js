import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    stockSymbol:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum: ['Buy', 'Sell'],
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
    currentPrice:{
        type:Number,
        default:0
    },
    companyName:{
        type:String,
        default:'company' 
    },
    totalPrice:{
        type:Number,
        default:0,
    },
    timeFrame:{
        type:String,
        // enum:['intraday','tomorrow','one_week','one_month']
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
        type:Number,
        default:0
    },
    profitPercentage:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    },
    exitedReason:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const Transaction = mongoose.model('Transaction',transactionSchema);
export default Transaction