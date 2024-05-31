import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {createChatUseCase} = dependencies.useCase;
    const createChatController = expressAsyncHandler(async(req,res)=>{
        const {userId,otherUserId} = req.body;
        const response = await createChatUseCase(dependencies).executeFunction(userId,otherUserId);
        res.status(200).json(response);
    })
    return createChatController
}