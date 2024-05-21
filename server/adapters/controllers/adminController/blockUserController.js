import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {blockUserUseCase} = dependencies.useCase;
    const blockUserController = expressAsyncHandler(async(req,res)=>{
        const {action} = req.body;
        const {name} = req.params;
        const response = await blockUserUseCase(dependencies).executeFunction(name,action);
        res.status(200).json(response);
    })
    return blockUserController
}