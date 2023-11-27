import { Router } from "express";
import {
  getAPIMethodsDescriptionSwagger,
  getAPIMethodsSwagger,
  getAPINameSwagger,
  getPathsParametersSwagger,
  getRequestBodySwagger,
  getResponsesSwagger,
  getSpecificUrlSwagger,
} from "./controllers/SwaggerController";
import { createPreConditionSwagger } from "./controllers/ExcelColumnsController";
import { test } from "./controllers/TestController";

const routes = Router();

routes.get("/api-name", getAPINameSwagger);
routes.get("/api-methods", getAPIMethodsSwagger);
routes.get("/api-descriptions", getAPIMethodsDescriptionSwagger);
routes.get("/api-specificURL", getSpecificUrlSwagger);
routes.get("/api-requestBody", getRequestBodySwagger);
routes.get("/api-pathsParameters", getPathsParametersSwagger);
routes.get("/api-responses", getResponsesSwagger);

routes.get("/preConditions", createPreConditionSwagger);

routes.get("/test", test);

export default routes;
