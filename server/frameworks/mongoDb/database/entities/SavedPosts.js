import mongoose from "mongoose";
const savedPostSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]
})

const SavedPosts = mongoose.model('SavedPosts',savedPostSchema);
export default SavedPosts