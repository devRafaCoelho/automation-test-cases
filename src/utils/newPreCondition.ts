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
          case "401":
            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                value: "Authorization: ' ' ",
              };
            }
            break;
          case "403":
            const preCondition403 = await createPreCondition403(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                value: preCondition403,
              };
            }
            break;
          case "404":
            const preCondition404 = await createPreCondition404(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                value: preCondition404,
              };
            }
            break;
          case "405":
            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                value: "PATCH",
              };
            }
            break;
          case "406":
            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                value: "Accept: text/plain",
              };
            }
            break;
          case "415":
            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                value: "Content-Type: text/plain",
              };
            }
            break;
          case "429":
            const preCondition429 = await createPreCondition429(swaggerFile);

            if (!preCondition[path][method][statusCode]) {
              preCondition[path][method][statusCode] = {
                description: responses[path][method][statusCode].description,
                value: preCondition429,
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

export const createPreCondition400 = async (swaggerFile: SwaggerFile) => {
  const parameters = await createObjectPathParameters(swaggerFile);
  const resquestBody = await getRequestBody2(swaggerFile);
  const preCondition400: PreCondition400 = {};

  for (const path in resquestBody) {
    if (!preCondition400[path]) preCondition400[path] = {};

    for (const method in resquestBody[path]) {
      if (!preCondition400[path][method]) preCondition400[path][method] = {};

      for (const element in resquestBody[path][method]) {
        const schemaList = getObjectsByKey(resquestBody[path][method], "$ref");

        if (schemaList.length > 0) {
          schemaList.forEach(async (schema) => {
            const schemaName = schema.split("/").pop();

            const properties = getObjectsByKey(
              swaggerFile.components?.schemas?.[schemaName],
              "properties"
            );

            const schemaRequiredParameters = await getSchemaRequiredParameters(
              swaggerFile,
              swaggerFile.components?.schemas?.[schemaName]
            );

            // for (const key in properties[0]) {
            //   preCondition400[path][method][schemaName] = properties[0];
            // }

            preCondition400[path][method][schemaName] =
              schemaRequiredParameters;
          });
        }
      }
    }
  }

  // for (const path in parameters) {
  //   if (!preCondition400[path]) preCondition400[path] = {};

  //   for (const method in parameters[path]) {
  //     if (!preCondition400[path][method]) preCondition400[path][method] = {};

  //     let index = 1;
  //     for (const key in parameters[path][method]) {
  //       preCondition400[path][method][index] = {
  //         ...parameters[path][method],
  //         [key]: "",
  //       };
  //       index++;
  //     }

  //     if (Object.values(preCondition400[path][method]).length > 1) {
  //       preCondition400[path][method][index] = {};
  //       for (const key in parameters[path][method]) {
  //         preCondition400[path][method][index][key] = "";
  //       }
  //     }
  //   }
  // }

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
  const objectParameters: ObjectParameters = {};

  for (const path in parameters) {
    for (const method in parameters[path]) {
      const requiredParameters = parameters[path][method];

      if (Array.isArray(requiredParameters)) {
        parameters[path][method] = objectParameters;

        requiredParameters.forEach((element: any) => {
          objectParameters[element.name] = element.example
            ? element.example
            : element.schema.example;
        });
      }
    }
  }

  return parameters;
};
