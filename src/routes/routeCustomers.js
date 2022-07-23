import { Router } from "express";
import getCustomersController from "../controllers/getCustomersController.js";

const routes = Router();

routes.get('/customers',getCustomersController)
routes.post('/customers')
routes.put('/customers')

export default routes;