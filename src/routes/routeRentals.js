import { Router } from "express";
import getRentalsController from "../controllers/getRentalsController.js";
import postRentalsController from "../controllers/postRentalsController.js";
import returnGameController from "../controllers/returnGameController.js";
import validatePostRentalsMiddleware from "../middlewares/validatePostRentalsMiddleware.js";
import validateReturnGame from "../middlewares/validateReturnGame.js";

const routes = Router();

routes.get('/rentals', getRentalsController);
routes.post('/rentals', validatePostRentalsMiddleware, postRentalsController);
routes.post('/rentals/:id/return', validateReturnGame,returnGameController)

export default routes;