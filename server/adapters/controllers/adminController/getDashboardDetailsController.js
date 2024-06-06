import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {getDashboardDetailsUseCase} = dependencies.useCase;
    const getDashboardDetailsController = expressAsyncHandler(async(req,res)=>{
        const response = await getDashboardDetailsUseCase(dependencies).executeFunction();
        res.status(200).json(response);
    })
    return getDashboardDetailsController
}