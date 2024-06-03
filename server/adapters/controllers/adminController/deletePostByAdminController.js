import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {deletePostByAdminUseCase} = dependencies.useCase;
    const deletePostByAdminController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const response = await deletePostByAdminUseCase(dependencies).executeFunction(id);
        res.status(200).json(response);
    })
    return deletePostByAdminController
}