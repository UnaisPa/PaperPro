import Portfolio from "../../database/entities/Portfolio.js"

const getTotalProfitRepo = async(userId) =>{
    try{
        const userPortfolio = await Portfolio.findOne({user:userId});
        const totalProfit = userPortfolio.totalProfit
        return {success:true,totalProfit}
    }catch(err){
        throw new Error(err)
    }
}
export default getTotalProfitRepo