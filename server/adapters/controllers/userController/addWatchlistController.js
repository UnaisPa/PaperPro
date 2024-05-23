import expressAsyncHandler from "express-async-handler";

export default (depndencies) =>{
    const {addWatchlistUseCase} = depndencies.useCase;
    const addWatchlistController = expressAsyncHandler(async(req,res)=>{
        const {userId,stockSymbol} = req.body;
        const response = await addWatchlistUseCase(depndencies).executeFunction(userId,stockSymbol);
        res.status(201).json(response);
    })
    return addWatchlistController
}