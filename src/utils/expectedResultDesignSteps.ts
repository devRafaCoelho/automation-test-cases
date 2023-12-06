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
    let subIndex200 = 0;
    let subIndex422 = 0;

    if (preConditions.hasOwnProperty(method)) {
      expectedResultDesignSteps[method] = [];

      for (const [index, element] of preConditions[method].entries()) {
        const message =
          element.statusCode === "200"
            ? "Busca apresenta sucesso."
            : "Busca apresenta falha.";

        const expectedResultData = [
          `1 - ${message}`,
          "2 - Response retorna os seguintes valores:",
        ];

        const filterResponses = responses[method].filter(
          (response) => response.statusCode === element.statusCode
        );

        const filterPreConditions = preConditions[method].filter(
          (preCondition) => {
            return preCondition.statusCode === element.statusCode;
          }
        );

        switch (element.statusCode) {
          case "200":
            expectedResultData.push(
              JSON.stringify(filterResponses[subIndex200].value, null, 2) ??
                JSON.stringify(filterResponses[0].value, null, 2)
            );
            subIndex200++;

            expectedResultData.push(`APIGEE = ${element.statusCode}`);
            expectedResultDesignSteps[method].push({
              statusCode: element.statusCode,
              value: expectedResultData,
            });
            break;
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
          case "422":
            expectedResultData.push(
              JSON.stringify(filterResponses[subIndex422].value, null, 2)
            );
            subIndex422++;

            expectedResultData.push(`APIGEE = ${element.statusCode}`);
            expectedResultDesignSteps[method].push({
              statusCode: element.statusCode,
              value: expectedResultData,
            });
            break;

          default:
            // if (filterResponses.length > 1) {
            //   if (filterResponses.length === filterPreConditions.length) {
            //     expectedResultData.push(
            //       JSON.stringify(filterResponses[index].value, null, 2)
            //     );
            //   } else {
            //     expectedResultData.push("");
            //   }
            // } else {
            //   expectedResultData.push(
            //     JSON.stringify(filterResponses[0].value, null, 2)
            //   );
            // }

            expectedResultData.push(
              JSON.stringify(filterResponses[0].value, null, 2)
            );

            expectedResultData.push(`APIGEE = ${element.statusCode}`);

            expectedResultDesignSteps[method].push({
              statusCode: element.statusCode,
              value: expectedResultData,
            });
            break;
        }
      }
    }
  }

  return expectedResultDesignSteps;
};

const getResponse400Required = async (filterResponses: any) => {
  let response400Required: any = {};

  await Promise.all(
    filterResponses.map(async (response: any) => {
      if (filterResponses.length > 1) {
        const message = getObjectsByKey(response, "detailedMessage");
        const includeMessage =
          message[0].includes("obrigatório") ||
          message[0].includes("ParametroInvalido") ||
          message[0].includes("invalido");

        if (includeMessage) {
          response400Required = response.value;
          return;
        }
      } else {
        response400Required = response.value;
      }
    })
  );

  return response400Required;
};
