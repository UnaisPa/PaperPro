import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },

})

const Comment = mongoose.model('Comment',commentSchema);
export default Comment;