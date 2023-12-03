import { ExpectedResultDesignSteps, SwaggerFile } from "../Types/types";
import { getObjectsByKey } from "./helpers";
import { createPreCondition } from "./preCondition";
import { getResponses } from "./swagger";

// export const createExpectedResultDesignSteps = async (
//   swaggerFile: SwaggerFile
// ): Promise<ExpectedResultDesignSteps> => {
//   const preConditions = await createPreCondition(swaggerFile);
//   const responses = await getResponses(swaggerFile);
//   const expectedResultDesignSteps: ExpectedResultDesignSteps = {};

//   for (const method in preConditions) {
//     expectedResultDesignSteps[method] = [];

//     await Promise.all(
//       preConditions[method].map(async (element, index) => {
//         const message =
//           element.statusCode === "200"
//             ? "Busca apresenta sucesso."
//             : "Busca apresenta falha.";

//         const expectedResultData = [
//           `1 - ${message}`,
//           "2 - Response retorna os seguintes valores:",
//         ];

//         const filterResponses = responses[method].filter((response) => {
//           return response.statusCode === element.statusCode;
//         });

//         switch (element.statusCode) {
//           case "400":
//             const response400Required = await getResponse400Required(
//               filterResponses
//             );

//             expectedResultData.push(
//               JSON.stringify(response400Required, null, 2)
//             );
//             expectedResultData.push(`APIGEE = ${element.statusCode}`);

//             expectedResultDesignSteps[method].push({
//               statusCode: element.statusCode,
//               value: expectedResultData,
//             });
//             break;
//           default:
//             if (filterResponses.length > 1) {
//               expectedResultData.push(
//                 JSON.stringify(filterResponses[index].value, null, 2)
//               );
//             } else {
//               expectedResultData.push(
//                 JSON.stringify(filterResponses[0].value, null, 2)
//               );
//             }

//             expectedResultData.push(`APIGEE = ${element.statusCode}`);

//             expectedResultDesignSteps[method].push({
//               statusCode: element.statusCode,
//               value: expectedResultData,
//             });

//             break;
//         }
//       })
//     );
//   }

//   return expectedResultDesignSteps;
// };

export const createExpectedResultDesignSteps = async (
  swaggerFile: SwaggerFile
): Promise<ExpectedResultDesignSteps> => {
  const preConditions = await createPreCondition(swaggerFile);
  const responses = await getResponses(swaggerFile);
  const expectedResultDesignSteps: ExpectedResultDesignSteps = {};

  for (const method in preConditions) {
    if (preConditions.hasOwnProperty(method)) {
      expectedResultDesignSteps[method] = [];

      for (const [index, element] of preConditions[method].entries()) {
        const message =
          element.statusCode === "200"
            ? "Busca apresenta sucesso."
            : "Busca apresenta falha.";

        const expectedResultData = [
          `1 - ${message}`,
          "2 - Response retorna os seguintes valores:",
        ];

        const filterResponses = responses[method].filter(
          (response) => response.statusCode === element.statusCode
        );

        switch (element.statusCode) {
          case "400":
            const response400Required = await getResponse400Required(
              filterResponses
            );

            expectedResultData.push(
              JSON.stringify(response400Required, null, 2)
            );
            expectedResultData.push(`APIGEE = ${element.statusCode}`);

            expectedResultDesignSteps[method].push({
              statusCode: element.statusCode,
              value: expectedResultData,
            });
            break;
          default:
            if (filterResponses.length > 1) {
              expectedResultData.push(
                JSON.stringify(filterResponses[index].value, null, 2)
              );
            } else {
              expectedResultData.push(
                JSON.stringify(filterResponses[0].value, null, 2)
              );
            }

            expectedResultData.push(`APIGEE = ${element.statusCode}`);

            expectedResultDesignSteps[method].push({
              statusCode: element.statusCode,
              value: expectedResultData,
            });

            break;
        }
      }
    }
  }

  return expectedResultDesignSteps;
};

const getResponse400Required = async (filterResponses: any) => {
  let response400Required: any = {};

  await Promise.all(
    filterResponses.map(async (response: any) => {
      if (filterResponses.length > 1) {
        const message = getObjectsByKey(response, "detailedMessage");
        const includeMessage =
          message[0].includes("obrigatório") ||
          message[0].includes("ParametroInvalido");

        if (includeMessage) {
          response400Required = response.value;
          return;
        }
      } else {
        response400Required = response.value;
      }
    })
  );

  return response400Required;
};

// const getResponse400Required = async (
//   filterResponses: any
// ): Promise<ExpectedResultDesignSteps> => {
//   let response400Required: any = {};

//   for (const iterator of object) {

//   }

//   filterResponses.forEach((response: any) => {
//     const message = getObjectsByKey(response, "detailedMessage");
//     const includeMessage =
//       message[0].includes("obrigatório") ||
//       message[0].includes("ParametroInvalido");

//     if (includeMessage) {
//       response400Required = response.value;
//     }
//   });

//   return response400Required;
// };
