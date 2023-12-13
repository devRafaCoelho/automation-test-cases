import { DescriptionDesignSteps, SwaggerFile } from "../Types/types";
import { createPreCondition } from "./preCondition";
import { getRequestBody } from "./swagger";

export const createDescriptionDesignSteps = async (
  swaggerFile: SwaggerFile
): Promise<DescriptionDesignSteps> => {
  const preConditions = await createPreCondition(swaggerFile);
  const requestBody = await getRequestBody(swaggerFile);
  const descriptionDegisnSteps: DescriptionDesignSteps = {};

  for (const method in preConditions) {
    descriptionDegisnSteps[method] = [];

    preConditions[method].forEach((element, index) => {
      const descriptionData = [
        "1 - Para validação do request, execute a API com os seguintes parâmetros:",
      ];

      if (element.statusCode === "200") {
        if (requestBody[method].length > 0) {
          const specificRequestBody = requestBody[method][index]
            ? requestBody[method][index]
            : requestBody[method][0];

          descriptionData.push(
            JSON.stringify(specificRequestBody.value, null, 2)
          );
        } else {
          descriptionData.push(JSON.stringify(element.value, null, 2));
        }
      } else {
        if (typeof element.value === "string") {
          descriptionData.push(element.value);
        } else if (Array.isArray(element.value)) {
          descriptionData.push(element.value.join("\n"));
        } else {
          descriptionData.push(JSON.stringify(element.value, null, 2));
        }
      }

      descriptionData.push(
        "2 - O response retornado deve apresentar o seguinte valor:"
      );
      descriptionData.push(`APIGEE = ${element.statusCode}`);

      descriptionDegisnSteps[method].push({
        statusCode: element.statusCode,
        value: descriptionData,
      });
    });
  }

  return descriptionDegisnSteps;
};
