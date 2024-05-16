import createTradeController from "./createTradeController.js";
import getPositionsController from "./getPositionsController.js";
import updatePositionController from "./updatePositionController.js";

export default (dependencies) =>{
    return {
        createTradeController:createTradeController(dependencies),
        getPositionsController:getPositionsController(dependencies),
        updatePositionController:updatePositionController(dependencies),
    }
}