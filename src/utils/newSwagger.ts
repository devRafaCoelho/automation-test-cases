import { MethodDescription, PathResponse, SwaggerFile } from "../Types/types";

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
              description: componentsResponse.description,
              content: contentType,
            };
          }
        }
      }
    }
  }

  return responses;
};

// else {
//   responses[path][method][statusCode] = {
//     description: methodResponses[statusCode]?.description,
//     content: methodResponses[statusCode]?.content,
//   };
// }
