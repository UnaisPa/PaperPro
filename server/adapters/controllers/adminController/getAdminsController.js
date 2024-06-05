import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getAdminsUseCase} = dependencies.useCase;
    const getAdminsController = expressAsyncHandler(async(req,res)=>{
        const response = await getAdminsUseCase(dependencies).executeFunction();
        res.status(200).json(response);
    })
    return getAdminsController
}