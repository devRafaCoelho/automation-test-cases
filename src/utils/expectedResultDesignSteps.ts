import { ExpectedResultDesignSteps, SwaggerFile } from "../Types/types";
import { getObjectsByKey } from "./helpers";
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

    await Promise.all(
      preConditions[method].map(async (element, index) => {
        const message =
          element.statusCode === "200"
            ? "Busca apresenta sucesso."
            : "Busca apresenta falha.";

        const expectedResultData = [
          `1 - ${message}`,
          "2 - Response retorna os seguintes valores:",
        ];

        const filterResponses = responses[method].filter((response) => {
          return response.statusCode === element.statusCode;
        });

        switch (element.statusCode) {
          case "400":
            const response400Required = await getResponse400Required(
              filterResponses
            );

            expectedResultData.push(
              JSON.stringify(response400Required, null, 2)
            );
            expectedResultData.push(`APIGEE = ${element.statusCode}`);

            expectedResultDesignSteps[method].push({
              statusCode: element.statusCode,
              value: expectedResultData,
            });
            break;
          default:
            if (filterResponses.length > 1) {
              expectedResultData.push(
                JSON.stringify(filterResponses[index].value, null, 2)
              );
            } else {
              expectedResultData.push(
                JSON.stringify(filterResponses[0].value, null, 2)
              );
            }

            expectedResultData.push(`APIGEE = ${element.statusCode}`);

            expectedResultDesignSteps[method].push({
              statusCode: element.statusCode,
              value: expectedResultData,
            });

            break;
        }
      })
    );
  }

  return expectedResultDesignSteps;
};

const getResponse400Required = async (filterResponses: any) => {
  let response400Required: any = {};

  filterResponses.forEach((response: any) => {
    const message = getObjectsByKey(response, "detailedMessage");

    if (message[0].includes("obrigatório")) {
      response400Required = response.value;
    }
  });

  return response400Required;
};
