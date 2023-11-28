import { DescriptionDesignSteps, SwaggerFile } from "../Types/types";
import { createPreCondition } from "./preCondition";

export const createDescriptionDesignSteps = async (
  swaggerFile: SwaggerFile
): Promise<DescriptionDesignSteps> => {
  const preConditions = await createPreCondition(swaggerFile);
  const descriptionDegisnSteps: DescriptionDesignSteps = {};

  for (const method in preConditions) {
    descriptionDegisnSteps[method] = [];

    preConditions[method].forEach((element) => {
      const descriptionData = [
        "1 - Para validação do request, execute a API com os seguintes parâmetros:",
      ];

      typeof element.value === "string"
        ? descriptionData.push(element.value)
        : descriptionData.push(JSON.stringify(element.value, null, 2));

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
