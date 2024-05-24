import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {deleteWatchlistUseCase} = dependencies.useCase;
    const deleteWatchController = expressAsyncHandler(async(req,res)=>{
        const {item} = req.query;
        const {id} = req.params;
        const response = await deleteWatchlistUseCase(dependencies).executeFunction(item,id);
        res.status(200).json(response);
    })
    return deleteWatchController
}