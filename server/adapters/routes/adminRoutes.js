import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import adminController from "../controllers/adminController/index.js"

export default (dependencies) => {
    const { authAdminController } = adminController(dependencies)
    const router = express.Router();
    
    router.post('/auth',authAdminController);

    return router

}