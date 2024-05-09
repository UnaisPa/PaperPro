import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {checkUsernameUseCase} = dependencies.useCase;
    const checkUsernameController = expressAsyncHandler(async(req,res)=>{
        const user = req.query.user;
        const response = await checkUsernameUseCase(dependencies).executeFunction(user);
        res.status(200).json(response);
    })
    return checkUsernameController
}