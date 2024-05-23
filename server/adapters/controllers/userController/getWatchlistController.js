import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getWatchlistUseCase} = dependencies.useCase;
    const getWatchlistController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await getWatchlistUseCase(dependencies).executeFunction(id);
        //console.log(response)
        return res.status(200).json(response);
    })
    return getWatchlistController
} 