import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getChatsUseCase} = dependencies.useCase;
    const getChatsController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params
        const response = await getChatsUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return getChatsController
}