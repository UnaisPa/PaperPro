import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {checkCPasswordUseCase} = dependencies.useCase;
    const checkCPassswordController = expressAsyncHandler(async(req,res)=>{
        const {userId,password} = req.body;
        const response = await checkCPasswordUseCase(dependencies).executeFunction(userId,password);
        res.status(200).json(response);
    })
    return checkCPassswordController;
}