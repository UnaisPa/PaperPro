import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {createCommentUseCase} = dependencies.useCase
    const createCommentController = expressAsyncHandler(async(req,res)=>{
        try{
            const {postId,userId,text} = req.body
            const updatedPost = await createCommentUseCase(dependencies).executeFunction(postId,userId,text);
            if(updatedPost){
                res.status(201).json({success:true,post:updatedPost,message:'Your comment has been added successfully!'})
            }
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    })
    return createCommentController
}