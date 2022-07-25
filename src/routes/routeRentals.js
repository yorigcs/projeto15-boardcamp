import { Router } from "express";
import getRentalsController from "../controllers/getRentalsController.js";
import postRentalsController from "../controllers/postRentalsController.js";
import validatePostRentalsMiddleware from "../middlewares/validatePostRentalsMiddleware.js";

const routes = Router();

routes.get('/rentals', getRentalsController);
routes.post('/rentals', validatePostRentalsMiddleware, postRentalsController);

export default routes;