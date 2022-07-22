import { Router } from "express";

const routes = Router();

routes.get('/categories');
routes.post('/categories')

export default routes;