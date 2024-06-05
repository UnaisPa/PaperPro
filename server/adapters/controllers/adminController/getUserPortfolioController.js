import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getUserPortfolioUseCase} = dependencies.useCase;
    const getUserPortfolioController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await getUserPortfolioUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return getUserPortfolioController
}