import expressAsyncHandler from "express-async-handler"

export default (dependencies) =>{
    const {updateFollowListUseCase} = dependencies.useCase
    const updateFollowListController = expressAsyncHandler(async(req,res)=>{
        try{
            const {currentUserId, userId} = req.body
            const updateUser = await updateFollowListUseCase(dependencies).executeFunction(currentUserId,userId);
            res.status(201).json({status:'success',user:updateUser});
        }catch(err){
            res.status(500).json(err.message)
        }
    })
    return updateFollowListController
}