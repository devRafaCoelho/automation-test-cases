import {
  ObjectParameters,
  PreCondition2,
  PreCondition400,
  SwaggerFile,
} from "../Types/types";
import { getObjectsByKey } from "./helpers";
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
          case "400":
            const preCondition400 = await createPreCondition400(swaggerFile);

            console.log(
              Object.values(preCondition400[path][method]).length === 1
            );

            if (!preCondition[path][method][statusCode]) {
              if (Object.values(preCondition400[path][method]).length === 1) {
                preCondition[path][method][statusCode] = {
                  description: responses[path][method][statusCode].description,
                  example: preCondition400[path][method],
                };
              } else {
                preCondition[path][method][statusCode] = {
                  description: responses[path][method][statusCode].description,
                  examples: preCondition400[path][method],
                };
              }
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

export const createPreCondition400 = async (swaggerFile: SwaggerFile) => {
  const parameters = await createObjectPathParameters(swaggerFile);
  const resquestBody = await getRequestBody2(swaggerFile);
  const preCondition400: PreCondition400 = {};

  for (const path in resquestBody) {
    if (!preCondition400[path]) preCondition400[path] = {};

    for (const method in resquestBody[path]) {
      if (!preCondition400[path][method]) preCondition400[path][method] = {};

      if (Object.values(resquestBody[path][method]).length > 0) {
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
                preCondition400[path][method][schemaName] =
                  schemaRequiredParameters;

                let index = 1;
                const subObject: any = {};
                for (const key in schemaRequiredParameters) {
                  subObject[index] = { ...schemaRequiredParameters, [key]: "" };
                  index++;
                }

                subObject[index] = {};
                for (const key in schemaRequiredParameters) {
                  subObject[index][key] = "";
                }

                preCondition400[path][method][schemaName] = subObject;
              } else {
                const properties = getObjectsByKey(
                  swaggerFile.components?.schemas?.[schemaName],
                  "properties"
                );
                const newObject: any = {};
                for (const key in properties[0]) {
                  newObject[key] = properties[0][key]?.example;
                }

                preCondition400[path][method] = newObject;

                let index = 1;
                const subObject: any = {};
                for (const key in newObject) {
                  subObject[index] = { ...newObject, [key]: "" };
                  index++;
                }

                subObject[index] = {};
                for (const key in newObject) {
                  subObject[index][key] = "";
                }

                preCondition400[path][method] = subObject;
              }
            });
          } else {
            const properties = getObjectsByKey(schemas, "properties");
            const newObject: any = {};
            for (const key in properties[0]) {
              if (properties[0][key].example) {
                newObject[key] = properties[0][key].example;
              }
            }

            preCondition400[path][method] = newObject;

            let index = 1;
            const subObject: any = {};
            for (const key in newObject) {
              subObject[index] = { ...newObject, [key]: "" };
              index++;
            }

            if (index > 2) {
              subObject[index] = {};
              for (const key in newObject) {
                subObject[index][key] = "";
              }
            }

            preCondition400[path][method] = subObject;
          }
        }
      }
    }
  }

  for (const path in parameters) {
    if (!preCondition400[path]) preCondition400[path] = {};

    for (const method in parameters[path]) {
      if (!preCondition400[path][method]) preCondition400[path][method] = {};

      if (Object.values(parameters[path][method]).length > 0) {
        let index = 1;
        for (const key in parameters[path][method]) {
          preCondition400[path][method][index] = {
            ...parameters[path][method],
            [key]: "",
          };
          index++;
        }

        if (Object.values(preCondition400[path][method]).length > 1) {
          preCondition400[path][method][index] = {};
          for (const key in parameters[path][method]) {
            preCondition400[path][method][index][key] = "";
          }
        }
      }
    }
  }

  return preCondition400;
};
