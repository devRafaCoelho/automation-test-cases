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
import {
  createDescriptionColumnSwagger,
  createDescriptionDesignStepsSwagger,
  createExcelDataSwagger,
  createExpectedResultDesignStepsSwagger,
  createPreConditionSwagger,
  createTestCaseNameSwagger,
} from "./controllers/ExcelColumnsController";
import { test, testPOST } from "./controllers/TestController";

const routes = Router();

routes.get("/api-name", getAPINameSwagger);
routes.get("/api-methods", getAPIMethodsSwagger);
routes.get("/api-descriptions", getAPIMethodsDescriptionSwagger);
routes.get("/api-specificURL", getSpecificUrlSwagger);
routes.get("/api-requestBody", getRequestBodySwagger);
routes.get("/api-pathsParameters", getPathsParametersSwagger);
routes.get("/api-responses", getResponsesSwagger);

routes.get("/preConditions", createPreConditionSwagger);
routes.get("/testCaseName", createTestCaseNameSwagger);
routes.get("/description", createDescriptionColumnSwagger);
routes.get("/descriptionDesignSteps", createDescriptionDesignStepsSwagger);
routes.get(
  "/expectedResultDesignSteps",
  createExpectedResultDesignStepsSwagger
);
routes.get("/excelData", createExcelDataSwagger);

routes.get("/test", test);
routes.post("/test", testPOST);

export default routes;
