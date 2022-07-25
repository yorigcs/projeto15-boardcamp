import { Router } from "express";
import postRentalsController from "../controllers/postRentalsController.js";
import validatePostRentalsMiddleware from "../middlewares/validatePostRentalsMiddleware.js";

const routes = Router();

routes.post('/rentals',validatePostRentalsMiddleware, postRentalsController);

export default routes;