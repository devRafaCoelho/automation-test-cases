import { Router } from "express";
import {
  getAPIMethodsSwagger,
  getAPINameSwagger,
} from "./controllers/SwaggerController";

const routes = Router();

routes.get("/api-name", getAPINameSwagger);
routes.get("/api-methods", getAPIMethodsSwagger);

export default routes;
