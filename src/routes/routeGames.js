import { Router } from "express";
import getGamesController from "../controllers/getGamesController.js";
import validatePostGamesMiddleware from "../middlewares/validatePostGamesMiddleware.js";


const routes = Router();
routes.get('/games',getGamesController)
routes.post('/games',validatePostGamesMiddleware)
export default routes;