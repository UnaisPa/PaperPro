import mongoose from "mongoose";
const reportedPostSchema = new mongoose.Schema({
    postBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reason:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }    
})

const ReportedPost = mongoose.model('ReportedPost',reportedPostSchema);
export default ReportedPost;