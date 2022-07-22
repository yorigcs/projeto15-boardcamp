import getCategoriesController from "../controllers/get-categories-controller.js";
import { Router } from "express";

const routes = Router();

routes.get('/categories',getCategoriesController);
routes.post('/categories')

export default routes;