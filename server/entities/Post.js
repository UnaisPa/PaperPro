import mongoose from "mongoose";

const postSchema =  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type:String,
        required:true
    },
    likes:{
        type:Number
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comments'
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