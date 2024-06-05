import Portfolio from "../../database/entities/Portfolio.js";
import User from "../../database/entities/User.js";

const getUserPortfolioRepo = async (id) => {
    try {
        const user = await User.findById(id)

        let portfolio = await Portfolio.findOne({ user: id }).populate({
            path: 'transactions',
            match: { active: false }
        });

        return {success:true,trades:portfolio.transactions,user,profit:portfolio.totalProfit}
    } catch (err) {
        throw new Error(err)
    }
}

export default getUserPortfolioRepo