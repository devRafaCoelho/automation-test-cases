import { PreCondition, SwaggerFile } from "../Types/types";
import { createPathParameterCombinations, getObjectsByKey } from "./helpers";
import {
  getPathsParameters,
  getRequestBody,
  getResponses,
  getSchemaRequiredParameters,
  getSpecificUrl,
} from "./swagger";

export const createPreCondition = async (
  swaggerFile: SwaggerFile
): Promise<PreCondition> => {
  const responses = await getResponses(swaggerFile);
  const preCondition: PreCondition = {};

  const useStatusCodeList = [
    "200",
    "400",
    "401",
    "403",
    "404",
    "405",
    "406",
    "415",
    "422",
    "429",
  ];

  const pathsValues = Object.values(swaggerFile.paths)[0];

  for (const method in pathsValues) {
    preCondition[method] = [];

    for (const statusCode of Object.keys(pathsValues[method].responses)) {
      const filterResponses = responses[method].filter((response) => {
        return response.statusCode === statusCode;
      });

      if (useStatusCodeList.includes(statusCode)) {
        switch (statusCode) {
          case "200":
            const preCondition200 = await createPreCondition200(swaggerFile);

            preCondition200[method].forEach((element: any) => {
              if (element.example) {
                preCondition[method].push({
                  statusCode: statusCode,
                  description: filterResponses[0].description,
                  example: element.example,
                  value: element.value,
                });
              } else {
                preCondition[method].push({
                  statusCode: statusCode,
                  description: filterResponses[0].description,
                  value: element.value,
                });
              }
            });
            break;
          case "400":
            const preCondition400 = await createPreCondition400(swaggerFile);

            preCondition400[method].forEach((element: any) => {
              if (element.example) {
                preCondition[method].push({
                  statusCode: statusCode,
                  description: filterResponses[0].description,
                  example: element.example,
                  value: element.value,
                });
              } else {
                preCondition[method].push({
                  statusCode: statusCode,
                  description: filterResponses[0].description,
                  value: element.value,
                });
              }
            });
            break;
          case "401":
            preCondition[method].push({
              statusCode: statusCode,
              description: filterResponses[0].description,
              value: "Authorization: ' ' ",
            });
            break;
          case "403":
            const preCondition403 = await createPreCondition403(swaggerFile);

            preCondition[method].push({
              statusCode: statusCode,
              description: filterResponses[0].description,
              value: preCondition403,
            });
            break;
          case "404":
            const preCondition404 = await createPreCondition404(swaggerFile);

            preCondition[method].push({
              statusCode: statusCode,
              description: filterResponses[0].description,
              value: preCondition404,
            });
            break;
          case "405":
            preCondition[method].push({
              statusCode: statusCode,
              description: filterResponses[0].description,
              value: "PATCH",
            });
            break;
          case "406":
            preCondition[method].push({
              statusCode: statusCode,
              description: filterResponses[0].description,
              value: "Accept: text/plain",
            });
            break;
          case "415":
            preCondition[method].push({
              statusCode: statusCode,
              description: filterResponses[0].description,
              value: "Content-Type: text/plain",
            });
            break;
          case "422":
            const preCondition422 = await createPreCondition422(swaggerFile);

            preCondition422[method].forEach((element: any) => {
              if (element.example) {
                preCondition[method].push({
                  statusCode: statusCode,
                  description: filterResponses[0].description,
                  example: element.example,
                  value: element.value,
                });
              } else {
                preCondition[method].push({
                  statusCode: statusCode,
                  description: filterResponses[0].description,
                  value: element.value,
                });
              }
            });
            break;
          case "429":
            const preCondition429 = await createPreCondition429(swaggerFile);

            preCondition[method].push({
              statusCode: statusCode,
              description: filterResponses[0].description,
              value: preCondition429,
            });
            break;
          default:
            break;
        }
      }
    }
  }

  return preCondition;
};

export const createPreCondition200 = async (swaggerFile: SwaggerFile) => {
  const requestBody = await getRequestBody(swaggerFile);
  const parameters = await createPathParameterCombinations(swaggerFile);
  const preCondition200: { [key: string]: any[] } = {};

  for (const method in requestBody) {
    preCondition200[method] = [];

    for (const element of requestBody[method]) {
      const schemaRequiredParameters = await getSchemaRequiredParameters(
        swaggerFile,
        swaggerFile.components?.schemas?.[`${element.schema}`]
      );

      for (const parameterName in schemaRequiredParameters) {
        if (typeof schemaRequiredParameters[parameterName] === "object") {
          for (const subParameterName in schemaRequiredParameters[
            parameterName
          ]) {
            const exampleRequestValue = getObjectsByKey(
              schemaRequiredParameters[parameterName],
              subParameterName
            );
            schemaRequiredParameters[parameterName][subParameterName] =
              removeQuotes(exampleRequestValue[0]);
          }
        } else {
          const exampleRequestValue = getObjectsByKey(
            element.value,
            parameterName
          );
          schemaRequiredParameters[parameterName] = removeQuotes(
            exampleRequestValue[0]
          );
        }
      }

      preCondition200[method].push({
        example: element.example || null,
        value: schemaRequiredParameters,
      });

      function removeQuotes(value: any) {
        if (
          typeof value === "string" &&
          value.startsWith('"') &&
          value.endsWith('"')
        ) {
          return value.slice(1, -1);
        }
        return value;
      }
    }
  }

  for (const method in parameters) {
    if (parameters[method].length > 0) {
      for (const element of parameters[method]) {
        preCondition200[method].push({
          value: element,
        });
      }
    } else {
      preCondition200[method].push({
        value: "",
      });
    }
  }

  return preCondition200;
};

export const createPreCondition400 = async (swaggerFile: SwaggerFile) => {
  const requestBody = await getRequestBody(swaggerFile);
  const pathsParameters = await createObjectPathParameters(swaggerFile);
  const preCondition400Obj: { [key: string]: any[] } = {};

  for (const method in requestBody) {
    preCondition400Obj[method] = [];

    await Promise.all(
      requestBody[method].map(async (element) => {
        const schemaRequiredParameters = await getSchemaRequiredParameters(
          swaggerFile,
          swaggerFile.components?.schemas?.[`${element.schema}`]
        );

        const emptyPropsCombination = emptyProp(
          schemaRequiredParameters,
          method
        );

        emptyPropsCombination.forEach((emptyProp) => {
          preCondition400Obj[method].push({
            example: element.example,
            value: emptyProp,
          });
        });
      })
    );
  }

  for (const method in pathsParameters) {
    if (pathsParameters[method].length > 0) {
      const emptyValues = emptyProp(pathsParameters[method][0], method);

      emptyValues.forEach((element) => {
        preCondition400Obj[method].push({ value: element });
      });
    } else {
      preCondition400Obj[method].push({ value: "" });
    }
  }

  function emptyProp(obj: any, method: string) {
    const keys = Object.keys(obj);
    const preCondition400 = [];

    keys.forEach((key) => {
      const newObj = { ...obj };

      for (const paramName in newObj) {
        if (paramName === key) newObj[key] = "";
      }

      preCondition400.push(newObj);
    });

    if (pathsParameters[method][0]) {
      if (Object.keys(pathsParameters[method][0]).length > 1) {
        for (const key in obj) {
          obj[key] = "";
        }

        preCondition400.push(obj);
      }
    } else {
      for (const key in obj) {
        obj[key] = "";
      }

      preCondition400.push(obj);
    }

    return preCondition400;
  }

  return preCondition400Obj;
};

export const createPreCondition403 = async (swaggerFile: SwaggerFile) => {
  const specificUrl = await getSpecificUrl(swaggerFile);
  const pathValue = Object.keys(swaggerFile.paths);

  return `${specificUrl[0].url}/(.*)${pathValue[0]}`;
};

export const createPreCondition404 = async (swaggerFile: SwaggerFile) => {
  const specificUrl = await getSpecificUrl(swaggerFile);
  const pathValue = Object.keys(swaggerFile.paths);

  return `${specificUrl[0].url}${pathValue[0]}/smart`;
};

export const createPreCondition422 = async (swaggerFile: SwaggerFile) => {
  const responses = await getResponses(swaggerFile);
  const preCondition = await createPreCondition200(swaggerFile);
  const preCondition422: { [key: string]: any[] } = {};

  const addComplement = (obj: any) => {
    const modifiedObjectsList: any[] = [];

    for (const parameterName in obj) {
      const rootObject = { ...obj };

      rootObject[parameterName] = obj[parameterName] + "*%5r";
      modifiedObjectsList.push(rootObject);
    }

    return modifiedObjectsList;
  };

  for (const method in responses) {
    preCondition422[method] = [];

    const responses422 = responses[method].filter((response) => {
      return response.statusCode === "422";
    });

    const preConditionsList = addComplement(preCondition[method][0].value);

    responses422.forEach((element, index) => {
      preCondition422[method].push({
        example: element.example || null,
        value: preConditionsList[index] ?? preConditionsList[0],
      });
    });
  }

  return preCondition422;
};

const createPreCondition429 = async (swaggerFile: SwaggerFile) => {
  const specificUrl = await getSpecificUrl(swaggerFile);
  const pathValue = Object.keys(swaggerFile.paths);

  return [
    `${specificUrl[0].url}${pathValue[0]}`,
    `${specificUrl[0].url}${pathValue[0]}`,
    `${specificUrl[0].url}${pathValue[0]}`,
  ];
};

export const createObjectPathParameters = async (swaggerFile: SwaggerFile) => {
  const parameters = await getPathsParameters(swaggerFile);
  const result: { [key: string]: any[] } = {};

  for (const method in parameters) {
    result[method] = [];

    if (parameters[method].length > 0) {
      const methodParams: { [key: string]: any } = {};

      parameters[method].forEach((param: any) => {
        methodParams[param.name] = param.example
          ? param.example
          : param.schema.example;
      });

      result[method].push(methodParams);
    }
  }

  return result;
};
