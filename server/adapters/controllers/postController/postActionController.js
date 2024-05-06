import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {postActionUseCase} = dependencies.useCase
    const postActionController = expressAsyncHandler(async(req,res)=>{
        const postId = req.params.id;
        const {action,userId} = req.body;
        //console.log(postId,action,userId);
        const response = await postActionUseCase(dependencies).executeFunction(postId,action,userId);
        if(response.success){
            res.status(200).json(response);
        }else{
            res.status(500).json(response)
        }
    })
    return postActionController
}