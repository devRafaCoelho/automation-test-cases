import {
  ObjectParameters,
  PreCondition2,
  PreCondition200,
  PreCondition400,
  PreCondition422,
  SwaggerFile,
} from "../Types/types";
import { createPathParameterCombinations2, getObjectsByKey } from "./helpers";
import {
  getPathsParameters2,
  getRequestBody2,
  getResponses2,
} from "./newSwagger";
import { getSchemaRequiredParameters, getSpecificUrl } from "./swagger";

export const createPreCondition2 = async (swaggerFile: SwaggerFile) => {
  const pathsValues = swaggerFile.paths;
  const responses = await getResponses2(swaggerFile);
  const preCondition: PreCondition2 = {};

  for (const path in pathsValues) {
    if (!preCondition[path]) preCondition[path] = {};

    for (const method in pathsValues[path]) {
      if (!preCondition[path][method]) preCondition[path][method] = {};

      for (const statusCode in responses[path][method]) {
        switch (statusCode) {
          case "200":
            const preCondition200 = await createPreCondition200(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                examples: preCondition200[path][method],
              };
            }
            break;
          case "400":
            const preCondition400 = await createPreCondition400(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                examples: preCondition400[path][method],
              };
            }
            break;
          case "401":
            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                example: "Authorization: ' ' ",
              };
            }
            break;
          case "403":
            const preCondition403 = await createPreCondition403(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                example: preCondition403,
              };
            }
            break;
          case "404":
            const preCondition404 = await createPreCondition404(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                example: preCondition404,
              };
            }
            break;
          case "405":
            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                example: "PATCH",
              };
            }
            break;
          case "406":
            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                example: "Accept: text/plain",
              };
            }
            break;
          case "415":
            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                example: "Content-Type: text/plain",
              };
            }
            break;
          case "422":
            const preCondition422 = await createPreCondition422(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                examples: preCondition422[path][method],
              };
            }
            break;
          case "429":
            const preCondition429 = await createPreCondition429(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                example: preCondition429,
              };
            }
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
  const parameters = await createPathParameterCombinations2(swaggerFile);
  const resquestBody = await getRequestBody2(swaggerFile);
  const preCondition200: PreCondition200 = {};

  for (const path in resquestBody) {
    if (!preCondition200[path]) preCondition200[path] = {};

    for (const method in resquestBody[path]) {
      if (!preCondition200[path][method]) preCondition200[path][method] = {};

      if (Object.values(resquestBody[path][method]).length > 0) {
        let methodIndex = 1;

        for (const element in resquestBody[path][method]) {
          const schemas = getObjectsByKey(resquestBody[path][method], "schema");
          const schemaRef = getObjectsByKey(schemas[0], "$ref");

          if (schemaRef.length > 0) {
            schemaRef.forEach(async (schema) => {
              const schemaName = schema.split("/").pop();
              const schemaRequiredParameters =
                await getSchemaRequiredParameters(
                  swaggerFile,
                  swaggerFile.components?.schemas?.[schemaName]
                );

              if (Object.values(schemaRequiredParameters).length > 0) {
                preCondition200[path][method][schemaName] =
                  schemaRequiredParameters;
              } else {
                const properties = getObjectsByKey(
                  swaggerFile.components?.schemas?.[schemaName],
                  "properties"
                );
                const newObject: any = {};
                for (const key in properties[0]) {
                  newObject[key] = properties[0][key]?.example;
                }
                preCondition200[path][method][methodIndex.toString()] =
                  newObject;
              }

              methodIndex++;
            });
          } else {
            const properties = getObjectsByKey(schemas, "properties");
            const newObject: any = {};
            for (const key in properties[0]) {
              if (properties[0][key].example) {
                newObject[key] = properties[0][key].example;
              }
            }

            preCondition200[path][method][methodIndex.toString()] = newObject;
            methodIndex++;
          }
        }
      }
    }
  }

  for (const path in parameters) {
    if (!preCondition200[path]) preCondition200[path] = {};

    for (const method in parameters[path]) {
      if (!preCondition200[path][method]) preCondition200[path][method] = {};

      if (Object.values(parameters[path][method]).length > 0) {
        preCondition200[path][method] = parameters[path][method];
      }
    }
  }

  return preCondition200;
};

export const createPreCondition400 = async (swaggerFile: SwaggerFile) => {
  const preCondition200 = await createPreCondition200(swaggerFile);
  const resquestBody = await getRequestBody2(swaggerFile);
  const parameters = await createObjectPathParameters(swaggerFile);
  const preCondition400: PreCondition400 = {};

  for (const path in preCondition200) {
    if (!preCondition400[path]) preCondition400[path] = {};

    for (const method in preCondition200[path]) {
      if (!preCondition400[path][method]) preCondition400[path][method] = {};

      if (Object.values(resquestBody[path][method]).length > 0) {
        const newObject: any = {};
        let index = 1;
        for (const key in preCondition200[path][method]) {
          newObject[key] = {};

          for (const parameterName in preCondition200[path][method][key]) {
            if (
              typeof preCondition200[path][method][key][parameterName] ===
              "object"
            ) {
              for (const propName in preCondition200[path][method][key][
                parameterName
              ]) {
                newObject[key][index] = {
                  ...preCondition200[path][method][key][parameterName],
                  [propName]: "",
                };
                index++;
              }
            } else {
              if (preCondition200[path][method][key][parameterName]) {
                newObject[key][index] = {
                  ...preCondition200[path][method][key],
                  [parameterName]: "",
                };
                index++;
              }
            }
          }

          if (Object.keys(newObject[key]).length > 1) {
            newObject[key][index] = { ...preCondition200[path][method][key] };
            for (const parameterName in newObject[key][index]) {
              if (newObject[key][index][parameterName]) {
                newObject[key][index][parameterName] = "";
              }
            }

            index++;
          }
        }

        preCondition400[path][method] = newObject;
      } else {
        const newObject: any = {};
        let index = 1;

        for (const parameterName in parameters[path][method]) {
          newObject[index] = {
            ...parameters[path][method],
            [parameterName]: "",
          };
          index++;
        }

        if (Object.keys(newObject).length > 1) {
          newObject[index] = { ...parameters[path][method] };
          for (const parameterName in newObject[index]) {
            newObject[index][parameterName] = "";
          }
        }

        preCondition400[path][method] = newObject;
      }
    }
  }

  return preCondition400;
};

export const createPreCondition403 = async (swaggerFile: SwaggerFile) => {
  const specificUrl = await getSpecificUrl(swaggerFile);
  const pathValue = Object.keys(swaggerFile.paths);

  return `${specificUrl[0].url}/(.*)${pathValue[0]}`;
};

export const createPreCondition404 = async (swaggerFile: SwaggerFile) => {
  const specificUrl = await getSpecificUrl(swaggerFile);
  const pathValue = Object.keys(swaggerFile.paths);

  return `${specificUrl[0].url}${pathValue[0]}/smarth`;
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
  const parameters = await getPathsParameters2(swaggerFile);

  for (const path in parameters) {
    for (const method in parameters[path]) {
      const requiredParameters = parameters[path][method];

      if (Array.isArray(requiredParameters)) {
        const objectParameters: ObjectParameters = {};

        requiredParameters.forEach((element: any) => {
          objectParameters[element.name] = element.example
            ? element.example
            : element.schema.example;
        });

        parameters[path][method] = objectParameters;
      }
    }
  }

  return parameters;
};

export const createPreCondition422 = async (swaggerFile: SwaggerFile) => {
  const preCondition200 = await createPreCondition200(swaggerFile);
  const resquestBody = await getRequestBody2(swaggerFile);
  const parameters = await createObjectPathParameters(swaggerFile);
  const responses = await getResponses2(swaggerFile);
  const preCondition422: PreCondition422 = {};

  for (const path in preCondition200) {
    if (!preCondition422[path]) preCondition422[path] = {};

    for (const method in preCondition200[path]) {
      if (!preCondition422[path][method]) preCondition422[path][method] = {};

      if (responses[path][method]["422"]) {
        if (Object.values(resquestBody[path][method]).length > 0) {
          const newObject: any = {};
          let index = 1;
          for (const key in preCondition200[path][method]) {
            newObject[key] = {};

            for (const parameterName in preCondition200[path][method][key]) {
              if (
                typeof preCondition200[path][method][key][parameterName] ===
                "object"
              ) {
                for (const propName in preCondition200[path][method][key][
                  parameterName
                ]) {
                  newObject[key][index] = {
                    ...preCondition200[path][method][key][parameterName],
                    [propName]:
                      preCondition200[path][method][key][parameterName] +
                      "*%5r",
                  };
                  index++;
                }
              } else {
                if (preCondition200[path][method][key][parameterName]) {
                  newObject[key][index] = {
                    ...preCondition200[path][method][key],
                    [parameterName]:
                      preCondition200[path][method][key][parameterName] +
                      "*%5r",
                  };
                  index++;
                }
              }
            }
          }

          preCondition422[path][method] = newObject;
        } else {
          const newObject: any = {};
          let index = 1;

          for (const parameterName in parameters[path][method]) {
            newObject[index] = {
              ...parameters[path][method],
              [parameterName]: parameters[path][method][parameterName] + "*%5r",
            };
            index++;
          }

          preCondition422[path][method] = newObject;
        }
      }
    }
  }

  return preCondition422;
};
