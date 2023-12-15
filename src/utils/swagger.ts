import {
  MethodDescription,
  ParametersObject,
  RequestBodyItem,
  RequestBodyObject,
  ResponsesObject,
  SwaggerFile,
} from "../Types/types";
import { createExampleResponse, getObjectsByKey } from "./helpers";
import { getFirstFileName } from "./storage";

export const getAPIName = async () => {
  const fileName = await getFirstFileName();
  const apiName = fileName?.split(".")[0];

  return apiName;
};

export const getAPIMethods = async (swaggerFile: SwaggerFile) => {
  const pathsValues = Object.values(swaggerFile.paths)[0];
  const methods = Object.keys(pathsValues);

  return methods;
};

export const getAPIMethodsDescription = async (swaggerFile: SwaggerFile) => {
  const pathsValues = Object.values(swaggerFile.paths)[0];
  const descriptions: { [method: string]: string } = {};

  for (const method in pathsValues) {
    descriptions[method] = pathsValues[method].summary;
  }

  return descriptions;
};

export const getSpecificUrl = async (swaggerFile: any) => {
  const urls = swaggerFile.servers;

  const specificUrl = urls.filter((element: any) => {
    return (
      element.description === "Test (SaaS)" ||
      element.description === "Teste (SaaS)"
    );
  });

  return specificUrl;
};

export const getResponses = async (
  swaggerFile: SwaggerFile
): Promise<ResponsesObject> => {
  const pathsValues = Object.values(swaggerFile.paths)[0];
  const responses: ResponsesObject = {};

  for (const method in pathsValues) {
    responses[method] = [];
    const responsesMethod = pathsValues[method].responses;

    for (const statusCode in responsesMethod) {
      if (responsesMethod[statusCode].content) {
        if (Object.values(responsesMethod[statusCode].content).length === 1) {
          const responseType: any = Object.values(
            responsesMethod[statusCode].content
          )[0];

          if (responseType.examples) {
            for (const example in responseType.examples) {
              responses[method].push({
                statusCode,
                description: "Ok",
                example,
                value:
                  responsesMethod[statusCode].content["application/json"]
                    .examples[example].value,
              });
            }
          } else if (responseType.example) {
            responses[method].push({
              statusCode,
              description: "Ok",
              value: responseType.example.value ?? responseType.example,
            });
          } else if (responseType.schema) {
            const schemaName = responseType.schema["$ref"].split("/").pop();
            // const schemaName = responseType.example.schema["$ref"]
            //   .split("/")
            //   .pop();

            const schema = schemaName
              ? swaggerFile.components?.schemas?.[schemaName]
              : undefined;

            const exempleResponse = createExampleResponse(schema);

            responses[method].push({
              statusCode,
              description: "Ok",
              value: exempleResponse,
            });
          }
        } else {
          if (
            responsesMethod[statusCode].content["application/json"].examples
          ) {
            for (const example in responsesMethod[statusCode].content[
              "application/json"
            ].examples) {
              responses[method].push({
                statusCode,
                description: "Ok",
                example,
                value:
                  responsesMethod[statusCode].content["application/json"]
                    .examples[example].value,
              });
            }
          } else if (
            responsesMethod[statusCode].content["application/json"].example
          ) {
            responses[method].push({
              statusCode,
              description: "Ok",
              value:
                responsesMethod[statusCode].content["application/json"].example
                  .value,
            });
          } else if (
            responsesMethod[statusCode].content["application/json"].schema
          ) {
            const schemaName = responsesMethod[statusCode].content[
              "application/json"
            ].schema["$ref"]
              .split("/")
              .pop();

            const schema = schemaName
              ? swaggerFile.components?.schemas?.[schemaName]
              : undefined;

            const exempleResponse = createExampleResponse(schema);

            responses[method].push({
              statusCode,
              description: "Ok",
              value: exempleResponse,
            });
          }
        }
      } else if (responsesMethod[statusCode]["$ref"]) {
        const responseName = responsesMethod[statusCode]["$ref"]
          .split("/")
          .pop();

        const componentsResponse = responseName
          ? swaggerFile.components?.responses?.[responseName]
          : undefined;

        if (
          componentsResponse.content &&
          componentsResponse.content["application/json"].examples
        ) {
          for (const example in componentsResponse.content["application/json"]
            .examples) {
            responses[method].push({
              statusCode,
              description: componentsResponse.description,
              example,
              value:
                componentsResponse.content["application/json"].examples[example]
                  .value,
            });
          }
        } else if (
          componentsResponse.content &&
          componentsResponse.content["application/json"].example
        ) {
          responses[method].push({
            statusCode,
            description: componentsResponse.description,
            value: componentsResponse.content["application/json"].example,
          });
        }
      }
    }
  }

  return responses;
};

export const getRequestBody = async (
  swaggerFile: SwaggerFile
): Promise<RequestBodyObject> => {
  const pathsValues = Object.values(swaggerFile.paths)[0];
  const requestBody: RequestBodyObject = {};

  for (const method in pathsValues) {
    requestBody[method] = [];

    if (pathsValues[method].requestBody) {
      const schemas =
        pathsValues[method].requestBody.content["application/json"].schema;
      let schemaNames: string | string[];

      if (schemas.oneOf) {
        schemaNames = schemas.oneOf.map((element: any) => {
          return element["$ref"].split("/").pop();
        });
      } else {
        schemaNames = schemas["$ref"].split("/").pop();
      }

      if (
        pathsValues[method].requestBody.content &&
        pathsValues[method].requestBody.content["application/json"].examples
      ) {
        Object.keys(
          pathsValues[method].requestBody.content["application/json"].examples
        ).forEach((example, index) => {
          const requestBodyItem: RequestBodyItem = {
            example,
            schema: Array.isArray(schemaNames)
              ? schemaNames[index]
              : schemaNames,
            value:
              pathsValues[method].requestBody.content["application/json"]
                .examples[example].value,
          };
          requestBody[method].push(requestBodyItem);
        });
      } else if (
        pathsValues[method].requestBody.content &&
        pathsValues[method].requestBody.content["application/json"].example
      ) {
        const requestBodyItem: RequestBodyItem = {
          schema: schemaNames,
          value:
            pathsValues[method].requestBody.content["application/json"].example,
        };
        requestBody[method].push(requestBodyItem);
      } else {
        const requestBodyItem: RequestBodyItem = {
          value: schemaNames,
          schema: Array.isArray(schemaNames) ? schemaNames : [schemaNames],
        };
        requestBody[method].push(requestBodyItem);
      }
    }
  }

  return requestBody;
};

export const getPathsParameters = async (
  swaggerFile: SwaggerFile
): Promise<ParametersObject> => {
  const pathsValues = Object.values(swaggerFile.paths)[0];
  const parameters: ParametersObject = {};

  for (const method in pathsValues) {
    parameters[method] = [];

    if (pathsValues[method].parameters) {
      const requiredParameters = pathsValues[method].parameters.filter(
        (element: any) => {
          return element.required === true;
        }
      );

      requiredParameters.forEach((element: any) => {
        parameters[method].push(element);
      });
    }
  }

  return parameters;
};

export const getSchemaRequiredParameters = async (
  swaggerFile: SwaggerFile,
  schema: any
): Promise<ParametersObject> => {
  const requiredParameters: any[] = getObjectsByKey(schema, "required");
  const requiredParametersObject: { [key: string]: any } = {};
  const schemaNames: string[] = [];

  requiredParameters.forEach((parameterList: any[]) => {
    parameterList.forEach((parameterName: any) => {
      const subObj = getObjectsByKey(schema, parameterName)[0];

      if (subObj && subObj.example) {
        requiredParametersObject[parameterName] = subObj.example;
      } else {
        const refs = getObjectsByKey(subObj, "$ref");

        if (refs.length > 0) {
          refs.forEach((ref) => {
            const schemaName = ref.split("/").pop();
            schemaNames.push(schemaName);
          });
        }
      }
    });
  });

  function resumeArray(array: any[]) {
    return array.reduce((uniqueArray, currentItem) => {
      if (!uniqueArray.includes(currentItem)) {
        uniqueArray.push(currentItem);
      }
      return uniqueArray;
    }, []);
  }

  const uniqueSchemaNames = resumeArray(schemaNames);

  uniqueSchemaNames.forEach((name: any) => {
    const refRequiredParameters = getObjectsByKey(
      swaggerFile.components?.schemas?.[name],
      "required"
    );

    if (refRequiredParameters.length > 0) {
      refRequiredParameters.forEach((refParameterNameList: any) => {
        refParameterNameList.forEach((refParameterName: any) => {
          if (!requiredParametersObject[name]) {
            requiredParametersObject[name] = {};
          }

          const refSubObj = getObjectsByKey(
            swaggerFile.components?.schemas?.[name],
            refParameterName
          );

          if (refSubObj[0].example) {
            requiredParametersObject[name][refParameterName] =
              refSubObj[0].example;
          } else {
            requiredParametersObject[name][refParameterName] =
              refSubObj[0].example;
          }
        });
      });
    }
  });

  return requiredParametersObject;
};

// export const getTest = async (swaggerFile: SwaggerFile): Promise<any> => {
//   const pathsValues = swaggerFile.paths;

//   for (const path in pathsValues) {
//     for (const method in pathsValues[path]) {
//       console.log(pathsValues[path][method]);
//     }
//   }

//   return pathsValues;
// };

// export const getAPIName = async (swaggerFile: any) => {
//   const title = swaggerFile.info.title;
//   const splitTitle = title.split(" ");
//   const lastElement = splitTitle.pop();

//   if (lastElement === ")") {
//     return splitTitle[splitTitle.length - 1];
//   } else if (lastElement.includes(":")) {
//     const resumeTitle = lastElement.split(":");
//     return resumeTitle.pop().replace(/\)$/, "");
//   } else if (lastElement.includes(")")) {
//     return lastElement.replace(/\)$/, "");
//   } else {
//     return lastElement;
//   }
// };
