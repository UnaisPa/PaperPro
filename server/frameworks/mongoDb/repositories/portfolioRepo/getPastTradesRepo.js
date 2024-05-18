import Portfolio from "../../database/entities/Portfolio.js";

const getPastTradesRepo = async (userId) =>{
    try{
        let portfolio = await Portfolio.findOne({ user: userId }).populate({
            path: 'transactions',
            match: { active: false }
        });

        if(portfolio){
            return {success:true,trades:portfolio.transactions}
        }else{
            return {success:false}
        }
    }catch(err){
        throw new Error(err)
    }
}

export default getPastTradesRepo