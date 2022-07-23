import { Router } from "express";
import getCustomerByIdController from "../controllers/getCustomerByIdController.js";
import getCustomersController from "../controllers/getCustomersController.js";

const routes = Router();

routes.get('/customers',getCustomersController)
routes.get('/customers/:id',getCustomerByIdController)
routes.post('/customers')
routes.put('/customers')

export default routes;