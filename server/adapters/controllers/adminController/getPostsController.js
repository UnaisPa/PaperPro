import expressAsyncHandler from "express-async-handler";

export default (dependencies) => {
    const { getPostsUseCase } = dependencies.useCase;
    const getPostsController = expressAsyncHandler(async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = 3
        //const limit = page * limits
        const skip = (page - 1) * limit;
        const response = await getPostsUseCase(dependencies).executeFunction(limit,skip);
        res.status(200).json({success:true,posts:response});
    })
    return getPostsController;
}