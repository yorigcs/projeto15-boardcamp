import { Router } from "express";

import getCategoriesController from "../controllers/getCategoriesController.js";
import validatePostCategoriesMiddleware from "../middlewares/validatePostCategoriesMiddleware.js";
import postCategoriesController from "../controllers/postCategoriesController.js";

const routes = Router();

routes.get('/categories', getCategoriesController);
routes.post('/categories', validatePostCategoriesMiddleware, postCategoriesController)

export default routes;