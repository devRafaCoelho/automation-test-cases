import { SwaggerFile, TestCaseName2 } from '../Types/types';
import { createPreCondition2 } from './newPreCondition';

export const createTestCaseName2 = async (swaggerFile: SwaggerFile) => {
  const preConditions = await createPreCondition2(swaggerFile);
  const testCaseName: TestCaseName2 = {};

  for (const path in preConditions) {
    if (!testCaseName[path]) testCaseName[path] = {};

    for (const method in preConditions[path]) {
      if (!testCaseName[path][method]) testCaseName[path][method] = {};

      let index = 1;

      for (const statusCode in preConditions[path][method]) {
        const testCaseIndex = index < 10 ? '00' : index < 100 ? '0' : '';
        const requestText =
          statusCode === '200' ? 'Request enviada com sucesso' : 'Request enviada com falha';

        const name = () => {
          testCaseName[path][method][
            statusCode
          ] = `CT${testCaseIndex}${index} - ${requestText} - ${preConditions[path][method][statusCode]?.description} - COD ${statusCode}`;
          index++;
        };

        switch (statusCode) {
          case '200':
            if (Object.keys(preConditions[path][method][statusCode]?.examples).length > 1) {
              let subIndex = 1;
              testCaseName[path][method][statusCode] = {};

              for (const example in preConditions[path][method][statusCode]?.examples) {
                testCaseName[path][method][statusCode][
                  subIndex
                ] = `CT${testCaseIndex}${index}.${subIndex} - ${requestText} - ${preConditions[path][method][statusCode]?.description} - COD ${statusCode}`;
                subIndex++;
              }
            } else {
              name();
            }
            break;
          case '400':
          case '422':
            if (Object.keys(preConditions[path][method][statusCode]?.examples).length > 1) {
              testCaseName[path][method][statusCode] = {};

              for (const key in preConditions[path][method][statusCode]?.examples) {
                if (!Number(key)) {
                  for (const testCaseNumber in preConditions[path][method][statusCode]?.examples[
                    key
                  ]) {
                    testCaseName[path][method][statusCode][
                      testCaseNumber
                    ] = `CT${testCaseIndex}${index}.${testCaseNumber} - ${requestText} - ${preConditions[path][method][statusCode]?.description} - COD ${statusCode}`;
                  }
                } else {
                  testCaseName[path][method][statusCode][
                    key
                  ] = `CT${testCaseIndex}${index}.${key} - ${requestText} - ${preConditions[path][method][statusCode]?.description} - COD ${statusCode}`;
                }
              }
            } else {
              name();
            }
            break;

          default:
            if (preConditions[path][method][statusCode].example) {
              name();
            }
            break;
        }
      }
    }
  }

  return testCaseName;
};
