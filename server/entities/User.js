import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String
    },
    followers:{
        type:Number,
        default:0
    },
    following:{
        type:Number,
        default:0
    },
    profilePicture:{
        type:String
    },
    bio:{
        type:String
    },
    watchlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Watchlist'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' // This tells Mongoose to use the Post model for population
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema);
export default User