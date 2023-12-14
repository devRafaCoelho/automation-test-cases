import {
  MethodDescription,
  PathParameter,
  PathRequestBody,
  PathResponse,
  SwaggerFile,
} from "../Types/types";

export const getAPIMethodsDescription2 = async (swaggerFile: SwaggerFile) => {
  const pathsValues = swaggerFile.paths;
  const descriptions: MethodDescription = {};

  for (const path in pathsValues) {
    if (!descriptions[path]) descriptions[path] = {};

    for (const method in pathsValues[path]) {
      descriptions[path][method] = pathsValues[path][method].summary;
    }
  }

  return descriptions;
};

export const getResponses2 = async (
  swaggerFile: SwaggerFile
): Promise<PathResponse> => {
  const pathsValues = swaggerFile.paths;
  const responses: PathResponse = {};

  for (const path in pathsValues) {
    if (!responses[path]) responses[path] = {};

    for (const method in pathsValues[path]) {
      if (!responses[path][method]) responses[path][method] = {};

      const methodResponses = pathsValues[path][method].responses;

      for (const statusCode in methodResponses) {
        if (!responses[path][method][statusCode]) {
          if (methodResponses[statusCode]["$ref"]) {
            const responseName = methodResponses[statusCode]["$ref"]
              .split("/")
              .pop();

            const componentsResponse =
              swaggerFile.components?.responses?.[responseName];

            const contentType =
              Object.values(componentsResponse.content).length === 1
                ? componentsResponse.content
                : Object.values(
                    componentsResponse.content["application/json"]
                  ) || Object.values(componentsResponse.content)[0];

            responses[path][method][statusCode] = {
              description:
                statusCode === "200" ? "Ok" : componentsResponse.description,
              content: contentType,
            };
          } else {
            const contentType =
              Object.values(methodResponses[statusCode]?.content).length === 1
                ? methodResponses[statusCode]?.content
                : Object.values(
                    methodResponses[statusCode]?.content["application/json"]
                  ) || Object.values(methodResponses[statusCode]?.content)[0];

            responses[path][method][statusCode] = {
              description:
                statusCode === "200"
                  ? "Ok"
                  : methodResponses[statusCode]?.description,
              content: contentType,
            };
          }
        }
      }
    }
  }

  return responses;
};

export const getRequestBody2 = async (
  swaggerFile: SwaggerFile
): Promise<PathRequestBody> => {
  const pathsValues = swaggerFile.paths;
  const requestBody: PathRequestBody = {};

  for (const path in pathsValues) {
    if (!requestBody[path]) requestBody[path] = {};

    for (const method in pathsValues[path]) {
      if (!requestBody[path][method]) requestBody[path][method] = {};

      if (pathsValues[path][method].requestBody) {
        const methodRequestBody = pathsValues[path][method].requestBody;

        const contentType =
          Object.values(methodRequestBody.content).length === 1
            ? methodRequestBody.content
            : Object.values(methodRequestBody.content["application/json"]) ||
              Object.values(methodRequestBody.content)[0];

        requestBody[path][method] = contentType;
      }
    }
  }

  return requestBody;
};

export const getPathsParameters2 = async (
  swaggerFile: SwaggerFile
): Promise<PathParameter> => {
  const pathsValues = swaggerFile.paths;
  const patrameters: PathParameter = {};

  for (const path in pathsValues) {
    if (!patrameters[path]) patrameters[path] = {};

    for (const method in pathsValues[path]) {
      if (!patrameters[path][method]) patrameters[path][method] = {};

      if (pathsValues[path][method].parameters) {
        const methodParameters = pathsValues[path][method].parameters;

        const requiredParameters = methodParameters.filter((element: any) => {
          return element.required === true;
        });

        patrameters[path][method] =
          requiredParameters.length !== 0 ? requiredParameters : {};
      }
    }
  }

  return patrameters;
};
