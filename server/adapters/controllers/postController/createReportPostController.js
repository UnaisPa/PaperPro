import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {createReportPostUseCase} = dependencies.useCase;
    const createReportPostController = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const {postBy,reportedBy,reason} = req.body;
        const response = await createReportPostUseCase(dependencies).executeFunction(id,postBy,reportedBy,reason);
        res.status(200).json(response);
    })
    return createReportPostController
}