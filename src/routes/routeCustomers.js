import { Router } from "express";
import getCustomerByIdController from "../controllers/getCustomerByIdController.js";
import getCustomersController from "../controllers/getCustomersController.js";
import postCustomerController from "../controllers/postCustomerController.js";
import validatePostCustomerMiddleware from "../middlewares/validatePostCustomersMiddleware.js";

const routes = Router();

routes.get('/customers',getCustomersController)
routes.get('/customers/:id',getCustomerByIdController)
routes.post('/customers', validatePostCustomerMiddleware, postCustomerController)
routes.put('/customers')

export default routes;