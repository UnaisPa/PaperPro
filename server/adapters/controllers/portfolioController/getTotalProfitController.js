import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getTotalProfitUseCase} = dependencies.useCase;
    const getTotalProfitController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await getTotalProfitUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return getTotalProfitController
}