import expressAsyncHandler from "express-async-handler";

export default (dependencies) => {
    const { getReportedPostsUseCase } = dependencies.useCase;
    const getReportedPostsController = expressAsyncHandler(async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limits = 3
        const limit = page * limits
        //const skip = (page - 1) * limit;
        const response = await getReportedPostsUseCase(dependencies).executeFunction(limit);
        res.status(200).json({success:true,posts:response});
    })
    return getReportedPostsController;
}