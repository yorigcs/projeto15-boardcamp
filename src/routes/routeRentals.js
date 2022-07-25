import { Router } from "express";
import deleteRentalController from "../controllers/deleteRentalController.js";
import getRentalsController from "../controllers/getRentalsController.js";
import postRentalsController from "../controllers/postRentalsController.js";
import returnGameController from "../controllers/returnGameController.js";
import validateDeleteRental from "../middlewares/validateDeleteRental.js";
import validatePostRentalsMiddleware from "../middlewares/validatePostRentalsMiddleware.js";
import validateReturnGame from "../middlewares/validateReturnGame.js";

const routes = Router();

routes.get('/rentals', getRentalsController);
routes.post('/rentals', validatePostRentalsMiddleware, postRentalsController);
routes.post('/rentals/:id/return', validateReturnGame,returnGameController);
routes.delete('/rentals/:id',validateDeleteRental, deleteRentalController)

export default routes;