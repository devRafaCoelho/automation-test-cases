import { Description, SwaggerFile } from "../Types/types";
import { createPreCondition } from "./preCondition";
import { getAPIMethodsDescription, getSpecificUrl } from "./swagger";

export const createDescriptionColumn = async (
  swaggerFile: SwaggerFile
): Promise<Description> => {
  const descriptions = await getAPIMethodsDescription(swaggerFile);
  const specificUrl = await getSpecificUrl(swaggerFile);
  const pathValue = Object.keys(swaggerFile.paths);
  const preConditions = await createPreCondition(swaggerFile);
  const descriptionColumn: Description = {};

  for (const method in preConditions) {
    descriptionColumn[method] = [];

    preConditions[method].forEach((element: any) => {
      switch (element.statusCode) {
        case "403":
          descriptionColumn[method].push({
            statusCode: element.statusCode,
            example: [
              descriptions[method],
              "APIGEE",
              method.toUpperCase(),
              element.value,
            ],
          });
          break;
        case "404":
          descriptionColumn[method].push({
            statusCode: element.statusCode,
            example: [
              descriptions[method],
              "APIGEE",
              method.toUpperCase(),
              element.value,
            ],
          });
          break;
        case "405":
          descriptionColumn[method].push({
            statusCode: element.statusCode,
            example: [
              descriptions[method],
              "APIGEE",
              element.value,
              `${specificUrl[0].url}${pathValue[0]}`,
            ],
          });
          break;
        default:
          descriptionColumn[method].push({
            statusCode: element.statusCode,
            example: [
              descriptions[method],
              "APIGEE",
              method.toUpperCase(),
              `${specificUrl[0].url}${pathValue[0]}`,
            ],
          });
          break;
      }
    });
  }

  return descriptionColumn;
};
