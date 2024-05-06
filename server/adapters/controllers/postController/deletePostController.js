import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {deletePostUseCase} = dependencies.useCase;
    const deletePostController = expressAsyncHandler(async(req,res)=>{
        const postId = req.params.id
        const response = await deletePostUseCase(dependencies).executeFunction(postId);
        if(response.success){
            res.status(200).json(response);
        }else{
            res.status(500).json({message:'Post not found!'})
        }
    })
    return deletePostController
}