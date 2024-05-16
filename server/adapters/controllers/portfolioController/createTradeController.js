import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {createTradeUseCase} = dependencies.useCase;
    const createTradeController = expressAsyncHandler(async(req,res)=>{
        const {formData,timeFrame,type,price,symbol} = req.body;
        const {id} = req.params
        const response = await createTradeUseCase(dependencies).executeFunction(formData,timeFrame,type,id,price,symbol);
        res.status(200).json(response);
    })
    return createTradeController
}