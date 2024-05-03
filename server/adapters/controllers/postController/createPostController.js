import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {createPostUseCase} = dependencies.useCase
    const createPostController = expressAsyncHandler(async(req,res)=>{
        try{
            const {id} = req.params;
            const {content, mediaUrls} = req.body
            const post = await createPostUseCase(dependencies).executeFunction(id,content,mediaUrls);
            res.status(201).json(post);
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    })
    return createPostController
}