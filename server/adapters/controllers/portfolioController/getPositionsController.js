import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getPositionsUseCase} = dependencies.useCase;
    const getPositionsController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await getPositionsUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return getPositionsController
}