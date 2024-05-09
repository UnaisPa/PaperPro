import expressAsyncHandler from "express-async-handler";

export default (dependencies) =>{
    const {editProfileUseCase} = dependencies.useCase;
    const editProfileController = expressAsyncHandler(async(req,res)=>{
        const data = req.body.formData;
        const profilePicture = req.body.profileImageUrl
        const userId = req.params.id;
        const response = await editProfileUseCase(dependencies).executeFunction(data,userId,profilePicture);
        res.status(200).json(response)
    })
    return editProfileController;
}