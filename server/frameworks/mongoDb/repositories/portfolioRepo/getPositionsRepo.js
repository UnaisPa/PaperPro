import Portfolio from "../../database/entities/Portfolio.js";

const getPositionsRepo = async (userId) =>{
    try{
        let portfolio = await Portfolio.findOne({ user: userId }).populate({
            path: 'transactions',
            match: { active: true }
        });

        if(portfolio){
            return {success:true,positions:portfolio.transactions}
        }else{
            return {success:false}
        }
    }catch(err){
        throw new Error(err)
    }
}

export default getPositionsRepo