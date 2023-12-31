import { ParametersObjectCombination, SwaggerFile } from "../Types/types";
import { getPathsParameters2 } from "./newSwagger";
import { getPathsParameters } from "./swagger";

export const getObjectsByKey = (obj: any, keyName: string): any[] => {
  if (obj && typeof obj === "object") {
    const result: any[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];

        if (key === keyName) {
          result.push(prop);
        } else if (typeof prop === "object") {
          result.push(...getObjectsByKey(prop, keyName));
        }
      }
    }

    return result;
  }

  return [];
};

export const createExampleResponse = (obj: any): Record<string, any> => {
  const exampleResponse: Record<string, any> = {};

  if (obj && obj.properties) {
    for (const key in obj.properties) {
      if (
        obj.properties.hasOwnProperty(key) &&
        typeof obj.properties[key] === "object"
      ) {
        if (obj.properties[key].type === "object") {
          exampleResponse[key] = createExampleResponse(obj.properties[key]);
        } else {
          exampleResponse[key] = obj.properties[key].hasOwnProperty("example")
            ? obj.properties[key].example
            : [];
        }
      }
    }
  }

  return exampleResponse;
};

export const createPathParameterCombinations = async (
  swaggerFile: SwaggerFile
): Promise<ParametersObjectCombination> => {
  const parameters = await getPathsParameters(swaggerFile);
  const combinations: ParametersObjectCombination = {};

  for (const method in parameters) {
    combinations[method] = [];

    if (parameters[method].length > 0) {
      let enumValues: { [key: string]: any[] } = {};

      parameters[method].forEach((element) => {
        if (element.schema.enum) {
          enumValues[element.name] = element.schema.enum;
        }
      });

      const totalCombinations = Object.values(enumValues).reduce(
        (accumulator, currentEnum) => accumulator * currentEnum.length,
        1
      );

      for (let index = 0; index < totalCombinations; index++) {
        const combination: ParametersObjectCombination = {};
        combinations[method].push(combination);
      }

      combinations[method].forEach((combination: any, index: number) => {
        Object.keys(enumValues).forEach((paramName) => {
          const enumIndex = index % enumValues[paramName].length;
          combination[paramName] = enumValues[paramName][enumIndex];
        });

        parameters[method].forEach((parameter) => {
          if (!parameter.schema.enum) {
            combination[parameter.name] =
              parameter.example ?? parameter.schema.example;
          }
        });
      });
    }
  }

  return combinations;
};

export const createPathParameterCombinations2 = async (
  swaggerFile: SwaggerFile
) => {
  const parameters = await getPathsParameters2(swaggerFile);
  const combinations: ParametersObjectCombination = {};

  for (const path in parameters) {
    combinations[path] = {};

    for (const method in parameters[path]) {
      const methodParameters = parameters[path][method];

      if (methodParameters && Array.isArray(methodParameters)) {
        if (methodParameters.length > 0) {
          let enumValues: { [key: string]: any[] } = {};

          methodParameters.forEach((element) => {
            if (element.schema && element.schema.enum) {
              enumValues[element.name] = element.schema.enum;
            }
          });

          const totalCombinations = Object.values(enumValues).reduce(
            (accumulator, currentEnum) => accumulator * currentEnum.length,
            1
          );

          combinations[path][method] = {};

          for (let index = 0; index < totalCombinations; index++) {
            const combination: ParametersObjectCombination = {};
            combinations[path][method][index + 1] = combination;

            Object.keys(enumValues).forEach((paramName) => {
              const enumIndex = index % enumValues[paramName].length;
              combination[paramName] = enumValues[paramName][enumIndex];
            });

            methodParameters.forEach((parameter) => {
              if (parameter.schema && !parameter.schema.enum) {
                combination[parameter.name] = parameter.example
                  ? parameter.example
                  : parameter.schema.example
                  ? parameter.schema.example
                  : getObjectsByKey(parameter.examples, "value");
              }
            });
          }
        }
      } else {
        combinations[path][method] = {};
      }
    }
  }

  return combinations;
};
