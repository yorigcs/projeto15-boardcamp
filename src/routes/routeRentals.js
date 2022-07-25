import { Router } from "express";
import validatePostRentalsMiddleware from "../middlewares/validatePostRentalsMiddleware.js";

const routes = Router();

routes.post('/rentals',validatePostRentalsMiddleware);

export default routes;