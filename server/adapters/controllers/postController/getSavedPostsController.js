import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getSavedPostsUseCase} = dependencies.useCase;
    const getSavedPostsController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await getSavedPostsUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return getSavedPostsController
}