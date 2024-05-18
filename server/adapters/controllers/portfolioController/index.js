import createTradeController from "./createTradeController.js";
import getPositionsController from "./getPositionsController.js";
import updatePositionController from "./updatePositionController.js";
import getTotalProfitController from "./getTotalProfitController.js";
import getPastTradesController from "./getPastTradesController.js";

export default (dependencies) =>{
    return {
        createTradeController:createTradeController(dependencies),
        getPositionsController:getPositionsController(dependencies),
        updatePositionController:updatePositionController(dependencies),
        getTotalProfitController:getTotalProfitController(dependencies),
        getPastTradesController:getPastTradesController(dependencies),
    }
}