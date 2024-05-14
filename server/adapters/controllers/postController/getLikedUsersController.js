import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getLikedUsersUseCase} = dependencies.useCase;
    const getLikedUsersController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await getLikedUsersUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return getLikedUsersController
}