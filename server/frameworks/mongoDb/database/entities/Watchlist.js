import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stocks: [{
        symbol: {
            type: String,
            required: true,
        },
    }]
})

const Watchlist = mongoose.model('watchlist', watchlistSchema);
export default Watchlist