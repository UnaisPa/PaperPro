import Portfolio from "../../database/entities/Portfolio.js";
import User from "../../database/entities/User.js";

const getAllUsersRepo = async (page) => {
    try {
        const size = 5;
        const data = await User.aggregate([
            {
                $lookup: {
                    from: 'portfolios',          // The name of the portfolio collection
                    localField: '_id',           // Field from the User collection to match
                    foreignField: 'user',        // Field from the Portfolio collection to match
                    as: 'portfolioDetails'       // Output array field
                }
            },
            {
                $unwind: {
                    path: '$portfolioDetails',   // Unwind the portfolioDetails array
                    preserveNullAndEmptyArrays: true  // Include users without a portfolio
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    userName: 1,
                    isBlocked:1,
                    profilePicture: 1,
                    margin:1,
                    'portfolioDetails.totalProfit': 1,
                    'portfolioDetails.transactions': 1
                }
            },
            {
                $skip:(page -1) * size
            },
            {
                $limit:size
            }
        ])

        let totalCount = await User.countDocuments()

        //console.log(data)

        return { success: true, users: data,totalCount }
    } catch (err) {
        throw new Error(err)
    }
}

export default getAllUsersRepo