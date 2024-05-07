import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {savePostUseCase} = dependencies.useCase
    const savePostController = expressAsyncHandler(async(req,res)=>{
        const {userId,postId} = req.body
        //console.log(userId)
        const response = await savePostUseCase(dependencies).executeFunction(userId,postId);
        if(response.success){
            res.status(200).json(response);
        }else{
            res.json(response);
        }
    })
    return savePostController
}