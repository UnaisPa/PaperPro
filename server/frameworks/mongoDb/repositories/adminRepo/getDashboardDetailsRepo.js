import Portfolio from "../../database/entities/Portfolio.js";
import Transaction from "../../database/entities/Transaction.js";
import User from "../../database/entities/User.js";

const getDashboardDetailsRepo = async () => {
    try {
        const transactionsCount = await Transaction.countDocuments();
        const userCount = await User.countDocuments();
        const result = await Portfolio.aggregate([
            {
                $group: {
                    _id: null,
                    totalProfit: { $sum: "$totalProfit" }
                }
            }
        ]);
    
        // Extracting total profit from the aggregation result
        const totalProfit = result.length > 0 ? result[0].totalProfit : 0;

        const initialCapitalPerUser = 1000000;
        const totalInitialCapital = userCount * initialCapitalPerUser;
        const netProfit = totalProfit - totalInitialCapital;
        const averageProfitPercentage = (netProfit / totalInitialCapital) * 100;

        const now = new Date();
        // Start of last week (7 days ago from now, inclusive of today)
        const startOfLastWeek = new Date(now);
        startOfLastWeek.setDate(now.getDate() - 6); // 7 days ago
        startOfLastWeek.setHours(0, 0, 0, 0); // Set to the start of the day

        // End of last week (end of today)
        const endOfLastWeek = new Date(now);
        endOfLastWeek.setHours(23, 59, 59, 999); // Set to the end of the day

        //console.log("Start of last week:", startOfLastWeek);
        //console.log("End of last week:", endOfLastWeek);

        const weeklyOverview = await Transaction.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startOfLastWeek,
                        $lte: endOfLastWeek
                    }
                }
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    totalTrades: { $sum: 1 },
                    averageProfit: { $avg: "$profit" }
                }
            },
            {
                $sort: { "_id": 1 } // Sort by day of the week
            }
        ]);

        //console.log("Weekly overview raw:", weeklyOverview);

        const totalTrades = new Array(7).fill(0);
        const averageProfits = new Array(7).fill(0);
        let index =0
        weeklyOverview.reverse();
        weeklyOverview.forEach(day => {
            //const index = (day._id + 5) % 7; // Adjusting $dayOfWeek to align with 0 (Monday) to 6 (Sunday)
            
            totalTrades[index] = day.totalTrades;
            averageProfits[index] = day.averageProfit;
            index++;
        });
        //console.log('totalTrades:' + totalTrades),
        //console.log('averageProfits', averageProfits)

        return { success: true,totalTrades,averageProfits,averageProfitPercentage,userCount,transactionsCount,totalProfit }
    } catch (err) {
        throw new Error(err)
    }
}

export default getDashboardDetailsRepo