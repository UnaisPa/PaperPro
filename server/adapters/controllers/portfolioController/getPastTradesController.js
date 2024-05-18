import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getPastTradesUseCase} = dependencies.useCase;
    const getPastTradesController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await getPastTradesUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return getPastTradesController
}