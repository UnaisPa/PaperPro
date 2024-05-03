import expressAsyncHandler from "express-async-handler"
import Post from "../../../frameworks/mongoDb/database/entities/Post.js"

export default (dependencies) =>{
    const {getAllPostsUseCase} = dependencies.useCase
    const getAllPostsController = expressAsyncHandler(async(req,res)=>{
        try{
            const page = parseInt(req.query.page) || 1;
            const limits = 3
            const limit = page * limits
            const posts = await getAllPostsUseCase(dependencies).executeFunction(limit);
            const count = await Post.countDocuments({hide:false})
            res.status(200).json({success:true,posts:posts,count});
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    })
    return getAllPostsController
} 