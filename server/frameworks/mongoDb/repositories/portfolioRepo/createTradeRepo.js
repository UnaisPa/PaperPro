import Portfolio from "../../database/entities/Portfolio.js"
import Transaction from "../../database/entities/Transaction.js"
import User from "../../database/entities/User.js";
const createTradeRepo = async (formData, timeFrame, type, id, price, symbol) => {
    try {
        const { quantity, stopLoss, target } = formData;
        console.log(id)
        console.log(quantity, stopLoss, target, timeFrame, type);
        const totalPrice = price * quantity;

        const newTransaction = await new Transaction({
            stockSymbol: symbol,
            quantity: quantity,
            timeFrame: timeFrame,
            target: target,
            stopLoss: stopLoss,
            stockPrice: price,
            type: type,
            totalPrice: totalPrice,
            active: true
        }).save()


        let portfolio = await Portfolio.findOne({ user: id });

        if (!portfolio) {
            portfolio = await new Portfolio({
                user: id,
                transactions: [newTransaction._id] // initialize transactions with the new transaction ID
            }).save();
        } else {
            portfolio.transactions.push(newTransaction._id);
            await portfolio.save(); // save the updated portfolio
        }
        
        const updateUserMargin = await User.findOneAndUpdate({ _id: id }, { $inc: { margin: (-1 * totalPrice) } }, { new: true })
        if (updateUserMargin) {
            console.log('helo')
            return { success: true, trade: newTransaction,margin:updateUserMargin.margin }
        }
        return { success: false, trade: newTransaction }
    } catch (err) {
        throw new Error(err.message)
    }
}

export default createTradeRepo 