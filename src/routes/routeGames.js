import { Router } from "express";
import getGamesController from "../controllers/getGamesController.js";


const routes = Router();
routes.get('/games',getGamesController)
export default routes;