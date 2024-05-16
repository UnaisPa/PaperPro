import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {updatePositionUseCase} = dependencies.useCase;
    const updatePositionController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const {reason,profit,companyName,profitPercentage,userId} = req.body;
        const response  = await updatePositionUseCase(dependencies).executeFunction(id,reason,profit,companyName,profitPercentage,userId);
        res.status(200).json(response);
    })
    return updatePositionController
}