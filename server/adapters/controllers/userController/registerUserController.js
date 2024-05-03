import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {createUserUseCase,verifyOtpUseCase} = dependencies.useCase
    const registerUserController = expressAsyncHandler(async(req,res)=>{
        try{
            let {name,email,mobile,password,otp} = req.body
            //console.log(name,email,mobile,password,otp)
    
            const verify = await verifyOtpUseCase(dependencies).executeFunction(email,otp);
            if(verify===true){
                let newUser = await createUserUseCase(dependencies).executeFunction(name,email,mobile,password);
                res.status(200).json(newUser);
            }else{
                console.log(verify.message)
                //if verify variable is not true, then it returns error messages
                res.status(200).json({success:false, message:verify.message})
            }
        }catch(err){
            res.status(500).json(err.message)
        }
    })
    return registerUserController
}