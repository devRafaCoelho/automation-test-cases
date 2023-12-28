import { SwaggerFile, TestCaseName2 } from "../Types/types";
import { createPreCondition2 } from "./newPreCondition";

export const createTestCaseName2 = async (swaggerFile: SwaggerFile) => {
  const preConditions = await createPreCondition2(swaggerFile);
  const testCaseName: TestCaseName2 = {};

  for (const path in preConditions) {
    if (!testCaseName[path]) testCaseName[path] = {};

    for (const method in preConditions[path]) {
      if (!testCaseName[path][method]) testCaseName[path][method] = {};
    }
  }

  return testCaseName;
};
