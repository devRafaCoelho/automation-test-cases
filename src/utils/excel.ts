import { ExcelData, SwaggerFile } from "../Types/types";
import { createDescriptionColumn } from "./description";
import { createDescriptionDesignSteps } from "./descriptionDesignSteps";
import { createExpectedResultDesignSteps } from "./expectedResultDesignSteps";
import { createPreCondition } from "./preCondition";
import { getAPIName } from "./swagger";
import { createTestCaseName } from "./testCaseName";

export const createExcelData = async (
  swaggerFile: SwaggerFile
): Promise<ExcelData> => {
  const apiName = await getAPIName(swaggerFile);
  const testCaseNames = await createTestCaseName(swaggerFile);
  const descriptions = await createDescriptionColumn(swaggerFile);
  const preConditions = await createPreCondition(swaggerFile);
  const descriptionDesignSteps = await createDescriptionDesignSteps(
    swaggerFile
  );
  const expectedResultDesignSteps = await createExpectedResultDesignSteps(
    swaggerFile
  );
  const excelData: ExcelData = {};

  for (const method in preConditions) {
    excelData[method] = [];

    preConditions[method].forEach((element, index) => {
      excelData[method].push({
        apiName,
        testCaseName: testCaseNames[method][index],
        description: descriptions[method][index].example || [],
        preCondition: element.value,
        assignedTo: "Z415515",
        stepName: "Step 1",
        descriptionDesignSteps:
          descriptionDesignSteps[method][index].value || [],
        expectedResultDesignSteps:
          expectedResultDesignSteps[method][index].value || [],
        type: "MANUAL",
        version: "1",
        testProvider: "Hitss",
        approvalFlow: "Novo",
      });
    });
  }

  return excelData;
};
