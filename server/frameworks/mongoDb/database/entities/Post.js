import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        required:true
    },
    mediaUrls:[String],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    hide:{
        type:Boolean,
        default:false
    }
})

const Post = mongoose.model('Post',postSchema);
export default Post