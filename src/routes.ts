import { Router } from "express";
import multer from "multer";
import {
  createDescriptionColumnSwagger,
  createDescriptionDesignStepsSwagger,
  createExcelDataSwagger,
  createExpectedResultDesignStepsSwagger,
  createPreConditionSwagger,
  createTestCaseNameSwagger,
} from "./controllers/ExcelColumnsController";
import { createExcelFileSwagger } from "./controllers/ExcelFileController";
import {
  getSwaggerData,
  uploadSwaggerFile,
} from "./controllers/FileController";
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
  test,
  testDelete,
  testFiles,
  testParameters,
  testRequestBody,
  testResponses,
} from "./controllers/TestController";

const routes = Router();

routes.post("/uploadFile", multer({}).single("swaggerFile"), uploadSwaggerFile);
routes.get("/swaggerData", getSwaggerData);

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
routes.post("/excelFile", createExcelFileSwagger);

routes.get("/testFiles", testFiles);
routes.get("/test", test);
routes.delete("/test", testDelete);

routes.get("/test-responses", testResponses);
routes.get("/test-resquestBody", testRequestBody);
routes.get("/test-parameters", testParameters);

export default routes;
