import expressAsyncHandler from "express-async-handler"

export default (dependencies) => {
    const { getUserByIdUseCase } = dependencies.useCase
    const getUserByIdController = expressAsyncHandler(async (req, res) => {
        try {
            //const userId = new mongoose.Types.ObjectId('661ca75291543d8591172d63')
            const userId = req.query.userId || 'no'
            //console.log(userId);
            const user = await getUserByIdUseCase(dependencies).executeFunction(userId);
            res.json({ success: true, user });
        } catch (err) {
            res.status(500).json(err.message)
        }
    })
    return getUserByIdController
}