import { Router } from "express";
import getCustomerByIdController from "../controllers/getCustomerByIdController.js";
import getCustomersController from "../controllers/getCustomersController.js";
import postCustomerController from "../controllers/postCustomerController.js";
import putCustomerController from "../controllers/putCustomerController.js";
import validatePostCustomerMiddleware from "../middlewares/validatePostCustomersMiddleware.js";
import validatePutCustomerMiddleware from "../middlewares/validatePutCustomerMiddleware.js";

const routes = Router();

routes.get('/customers', getCustomersController)
routes.get('/customers/:id', getCustomerByIdController)
routes.post('/customers', validatePostCustomerMiddleware, postCustomerController)
routes.put('/customers/:id', validatePutCustomerMiddleware, putCustomerController)

export default routes;