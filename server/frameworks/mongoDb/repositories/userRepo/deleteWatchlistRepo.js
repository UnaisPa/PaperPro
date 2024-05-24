import Watchlist from "../../database/entities/Watchlist.js"
const deleteWatchlistRepo = async(stockId,userId) =>{
    try{
        const userWatchlist = await Watchlist.findOne({user:userId});
        userWatchlist.stocks.pull({_id:stockId});
        await userWatchlist.save();
        return {success:true}
    }catch(err){
        throw new Error(err)
    }
}

export default deleteWatchlistRepo