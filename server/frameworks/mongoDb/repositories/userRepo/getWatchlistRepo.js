import Watchlist from "../../database/entities/Watchlist.js"

const getWatchlistRepo = async (userId) =>{
    try{
        const userWatchlist = await Watchlist.findOne({user:userId});
        if(!userWatchlist){
            return {success:false,message:'No stocks found in your watchlist.'}
        }
        return {success:true,stocks:userWatchlist.stocks}
    }catch(err){
        throw new Error(err)
    }
}

export default getWatchlistRepo;