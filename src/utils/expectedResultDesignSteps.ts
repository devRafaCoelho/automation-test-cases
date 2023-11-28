import { ExpectedResultDesignSteps, SwaggerFile } from "../Types/types";
import { createPreCondition } from "./preCondition";
import { getResponses } from "./swagger";

export const createExpectedResultDesignSteps = async (
  swaggerFile: SwaggerFile
): Promise<ExpectedResultDesignSteps> => {
  const preConditions = await createPreCondition(swaggerFile);
  const responses = await getResponses(swaggerFile);
  const expectedResultDesignSteps: ExpectedResultDesignSteps = {};

  for (const method in preConditions) {
    expectedResultDesignSteps[method] = [];

    preConditions[method].forEach((element, index) => {
      const message =
        element.statusCode === "200"
          ? "Busca apresenta sucesso."
          : "Busca apresenta falha.";

      const expectedResultData = [
        `1 - ${message}`,
        "2 - Response retorna os seguintes valores:",
      ];

      const response = responses[method].filter((response) => {
        return response.statusCode === element.statusCode;
      });

      expectedResultData.push(JSON.stringify(response[0].value, null, 2));
      expectedResultData.push(`APIGEE = ${element.statusCode}`);

      expectedResultDesignSteps[method].push({
        statusCode: element.statusCode,
        value: expectedResultData,
      });
    });
  }

  return expectedResultDesignSteps;
};
