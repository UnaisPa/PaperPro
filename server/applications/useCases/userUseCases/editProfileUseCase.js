export const editProfileUseCase = (dependencies) =>{
    const {repository:{editProfileRepo}} = dependencies;
    const executeFunction = async(data,userId,profilePicture)=>{
        const response = await editProfileRepo(data,userId,profilePicture);
        return response;
    }
    return {executeFunction}
}