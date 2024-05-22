import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {authAdminUseCase} = dependencies.useCase;
    const authAdminController = expressAsyncHandler(async(req,res)=>{
        const {email,password} = req.body;
        const response = await authAdminUseCase(dependencies).executeFunction(res,email,password);
        if(response){
            req.session.refreshToken = response.refreshToken
        }
        res.status(200).json(response);
    })
    return authAdminController
}