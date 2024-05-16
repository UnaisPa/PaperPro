import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import portfolioController from "../controllers/portfolioController/index.js";

export default (dependencies) =>{
    const {createTradeController,getPositionsController,updatePositionController} = portfolioController(dependencies)
    const router = express.Router();

    router.post('/create_trade/:id',protect,createTradeController);
    router.get('/get_positions/:id',protect,getPositionsController);
    router.put('/update_position/:id',protect,updatePositionController)

    return router
}