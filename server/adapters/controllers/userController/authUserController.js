import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {authUserUseCase} = dependencies.useCase
    const authUserController = expressAsyncHandler(async(req,res)=>{
        const {email,password} = req.body
        console.log(email)
        const auth = await authUserUseCase(dependencies).executeFunction(res,email,password);
        if(auth.user){
            res.status(200).json({ user: auth.user, token: auth.token });
        }else{
            res.status(404).json(auth.message) 
        }
    })
    return authUserController
} 