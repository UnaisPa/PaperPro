import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {hidePostUseCase} = dependencies.useCase;
    const hidePostController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const {type} = req.body;
        const response = await hidePostUseCase(dependencies).executeFunction(id,type);
        res.status(200).json(response);
    })
    return hidePostController;
}