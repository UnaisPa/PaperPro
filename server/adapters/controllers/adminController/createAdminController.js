import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {createAdminUseCase} = dependencies.useCase;
    const createAdminController = expressAsyncHandler(async(req,res)=>{
        const {formData,profileImageUrl} = req.body;
        const response = await createAdminUseCase(dependencies).executeFunction(formData,profileImageUrl);
        res.status(200).json(response);
    })
    return createAdminController;
}