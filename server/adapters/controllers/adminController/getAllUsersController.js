import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getAllUsersUseCase} = dependencies.useCase;
    const getAllUsersController = expressAsyncHandler(async(req,res)=>{
        const p = req.query.p || 1
        const response = await getAllUsersUseCase(dependencies).executeFunction(p);
        res.status(200).json(response);
    })
    return getAllUsersController;
}