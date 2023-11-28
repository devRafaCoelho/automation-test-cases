import { SwaggerFile, TestCaseName } from "../Types/types";
import { createPreCondition } from "./preCondition";

export const createTestCaseName = async (
  swaggerFile: SwaggerFile
): Promise<TestCaseName> => {
  const preConditions = await createPreCondition(swaggerFile);
  const tesCaseName: TestCaseName = {};

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

  function formatIndex(index: number) {
    return index < 10 ? `00${index}` : `0${index}`;
  }

  function formatSubIndex(index: number) {
    return index < 10 ? `0${index}` : `${index}`;
  }

  for (const method in preConditions) {
    tesCaseName[method] = [];
    let index = 1;

    useStatusCodeList.forEach((statusCode) => {
      const message =
        statusCode === "200"
          ? "Request enviada com sucesso"
          : "Request enviada com falha";

      const filterTestCases = preConditions[method].filter((element) => {
        return element.statusCode === statusCode;
      });

      if (filterTestCases.length > 1) {
        for (
          let exampleIndex = 1;
          exampleIndex <= filterTestCases.length;
          exampleIndex++
        ) {
          const example = filterTestCases[exampleIndex - 1].example ?? "";
          const examplePart = example ? ` - ${example}` : "";

          tesCaseName[method].push(
            `CT${formatIndex(index)}.${formatSubIndex(
              exampleIndex
            )} - ${message}${examplePart} - ${
              filterTestCases[exampleIndex - 1].description
            } - COD ${statusCode}`
          );
        }
        index++;
      } else if (filterTestCases.length === 1) {
        tesCaseName[method].push(
          `CT${formatIndex(index)} - ${message} - ${
            filterTestCases[0].description
          } - COD ${statusCode}`
        );
        index++;
      } else {
        return;
      }
    });
  }

  return tesCaseName;
};
