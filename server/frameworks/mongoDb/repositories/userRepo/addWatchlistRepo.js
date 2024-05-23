import Watchlist from "../../database/entities/Watchlist.js"

const addWatchlistRepo = async (userId, symbol) => {
    try {
        let userWatchlist = await Watchlist.findOne({ user: userId });
        const checkStock = await Watchlist.findOne({ "stocks.symbol": { $in: [symbol] } });
        if (checkStock) {
            return { success: false, message: "You've already added this stock to your watchlist!" }
        } else {
            if (!userWatchlist) {
                userWatchlist = new Watchlist({
                    user: userId,
                    stocks: []
                });

            }
            userWatchlist.stocks.push({ symbol });
            await userWatchlist.save();
            return { success: true, message: 'Stock successfully added to your Watchlist!' }
        }


    } catch (err) {
        throw new Error(err)
    }
}

export default addWatchlistRepo