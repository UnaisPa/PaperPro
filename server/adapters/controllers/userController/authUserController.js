import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {authUserUseCase} = dependencies.useCase
    const authUserController = expressAsyncHandler(async(req,res)=>{
        const {email,password} = req.body
        console.log(email)
        const auth = await authUserUseCase(dependencies).executeFunction(res,email,password);
        if(auth.user){
            req.session.refreshToken =  auth.refreshToken
            req.session.userId =  auth.user._id
            req.session.save()
            //console.log(req.session.userId, req.session.refreshToken)
            res.status(200).json({ user: auth.user, token: auth.token, });
        }else{ 
            res.status(400).json(auth.message) 
        }
    })
    return authUserController
} 