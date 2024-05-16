import Transaction from "../../database/entities/Transaction.js"
import User from "../../database/entities/User.js"
const updatePositionRepo = async (id,reason,profit,companyName,profitPercentage,userId) =>{
    try{
        const transaction = await Transaction.findByIdAndUpdate(id,{$set:{active:false,exitedReason:reason,profit:profit,companyName:companyName,profitPercentage:profitPercentage}},{new:true});
        const updateMargin = await User.findByIdAndUpdate(userId,{$inc:{margin:profit}},{new:true})
        if(transaction && updateMargin){
            return {success:true,margin:updateMargin.margin}
        }
    }catch(err){
        throw new Error(err.message)
    }
}
export default updatePositionRepo