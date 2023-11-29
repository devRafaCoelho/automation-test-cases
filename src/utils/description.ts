import { Description, SwaggerFile } from "../Types/types";
import { createPreCondition } from "./preCondition";
import {
  getAPIMethodsDescription,
  getPathsParameters,
  getSpecificUrl,
} from "./swagger";

export const createDescriptionColumn = async (
  swaggerFile: SwaggerFile
): Promise<Description> => {
  const descriptions = await getAPIMethodsDescription(swaggerFile);
  const specificUrl = await getSpecificUrl(swaggerFile);
  const pathValue = Object.keys(swaggerFile.paths);
  const preConditions = await createPreCondition(swaggerFile);
  const parameters = await getPathsParameters(swaggerFile);
  const descriptionColumn: Description = {};

  for (const method in preConditions) {
    descriptionColumn[method] = [];

    const queryParameters =
      parameters[method].length > 0
        ? parameters[method].filter((param: any) => {
            return param.in === "query";
          })
        : null;

    const nameParameters = queryParameters?.map((element) => {
      return element.name;
    });

    preConditions[method].forEach((element: any) => {
      switch (element.statusCode) {
        case "400":
          if (parameters[method].length > 0) {
            const arrayQueryParams = ["?"];

            for (const key in element.value) {
              if (nameParameters?.includes(key)) {
                arrayQueryParams.length > 1
                  ? arrayQueryParams.push(`&${key}=${element.value[key]}`)
                  : arrayQueryParams.push(`${key}=${element.value[key]}`);
              }
            }

            descriptionColumn[method].push({
              statusCode: element.statusCode,
              example: [
                descriptions[method],
                "APIGEE",
                method.toUpperCase(),
                `${specificUrl[0].url}${pathValue[0]}${arrayQueryParams.join(
                  ""
                )}`,
              ],
            });
          } else {
            descriptionColumn[method].push({
              statusCode: element.statusCode,
              example: [
                descriptions[method],
                "APIGEE",
                method.toUpperCase(),
                `${specificUrl[0].url}${pathValue[0]}`,
              ],
            });
          }
          break;
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
