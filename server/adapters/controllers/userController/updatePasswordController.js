import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {updatePasswordUseCase} = dependencies.useCase;
    const updatePasswordController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const {password} = req.body;
        const response = await updatePasswordUseCase(dependencies).executeFunction(password,id);
        //const response = await updatePasswordUseCase(dependencies).executeFunction(password,id);
        res.status(200).json(response);
    })
    return updatePasswordController
}