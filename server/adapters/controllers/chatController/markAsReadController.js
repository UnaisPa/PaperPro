import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {markAsReadUseCase} = dependencies.useCase;
    const markAsReadController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await markAsReadUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return markAsReadController;
}