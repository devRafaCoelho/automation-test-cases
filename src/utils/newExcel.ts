import { ExcelData2, SwaggerFile } from '../Types/types';
import { createDescriptionColumn2 } from './newDescriptions';
import { createPreCondition2 } from './newPreCondition';
import { getPathsParameters2 } from './newSwagger';
import { createTestCaseName2 } from './newTestCaseName';
import { getAPIName } from './swagger';
import ExcelJS from 'exceljs';

export const createExcelData2 = async (swaggerFile: SwaggerFile) => {
  const preConditions = await createPreCondition2(swaggerFile);
  const excelData: ExcelData2 = {};

  const apiName = await getAPIName();
  const testCaseNames = await createTestCaseName2(swaggerFile);
  const descriptions = await createDescriptionColumn2(swaggerFile);
  const parameters = await getPathsParameters2(swaggerFile);

  for (const path in preConditions) {
    if (!excelData[path]) excelData[path] = {};

    for (const method in preConditions[path]) {
      if (!excelData[path][method]) excelData[path][method] = {};
      let index = 1;

      for (const statusCode in preConditions[path][method]) {
        if (!excelData[path][method][statusCode]) excelData[path][method][statusCode] = {};

        const data = {
          apiName,
          testCaseName: '',
          description: descriptions[path][method][statusCode]?.data,
          preCondition: '',
          assignedTo: 'Z415515',
          stepName: 'Step 1',
          type: 'MANUAL',
          version: '1',
          testProvider: 'Hitss',
          approvalFlow: 'Novo'
        };

        if (preConditions[path][method][statusCode]?.example) {
          excelData[path][method][statusCode][index] = {
            ...data,
            testCaseName: testCaseNames[path][method][statusCode],
            preCondition: preConditions[path][method][statusCode]?.example
          };

          index++;
        } else {
          for (const example in preConditions[path][method][statusCode]?.examples) {
            if (statusCode === '200') {
              const singleDescription = Number(example)
                ? descriptions[path][method][statusCode][example]?.data
                : descriptions[path][method][statusCode]?.data;

              const singlePreCondition = Number(example)
                ? preConditions[path][method][statusCode]?.examples[example]
                : {
                    [example]: preConditions[path][method][statusCode]?.examples[example]
                  };

              excelData[path][method][statusCode][index] = {
                ...data,
                testCaseName: testCaseNames[path][method][statusCode][index],
                description: singleDescription,
                preCondition: singlePreCondition
              };

              index++;
            }

            // } else {
            //   for (const key in preConditions[path][method][statusCode]?.examples[example]) {
            //     const singleTestCaseName =
            //       Object.values(parameters[path][method]).length > 0
            //         ? testCaseNames[path][method][statusCode][example]
            //         : testCaseNames[path][method][statusCode][key];

            //     const singlePreCondition =
            //       Object.values(parameters[path][method]).length > 0
            //         ? preConditions[path][method][statusCode]?.examples[example]
            //         : preConditions[path][method][statusCode]?.examples[example][key];

            //     excelData[path][method][statusCode][index] = {
            //       ...data,
            //       testCaseName: singleTestCaseName,
            //       preCondition: singlePreCondition
            //     };

            //     index++;
            //   }
            // }
          }
        }
      }
    }
  }

  return excelData;
};

export const createExcelFile2 = async (swaggerFile: SwaggerFile) => {
  const apiName = await getAPIName();
  const excelData = await createExcelData2(swaggerFile);

  const headerColumnTitles = [
    'Subject',
    'Test Name',
    'Description',
    'Pré Condição',
    'Atribuído à',
    'Step Name (Design Steps)',
    // "Description (Design Steps)",
    // "Expected Result (Design Steps)",
    'Type',
    'Versão',
    'Fornecedor de Testes',
    'Fluxo de Aprovação'
  ];

  let index = 1;
  for (const path in excelData) {
    const workbook = new ExcelJS.Workbook();

    for (const method in excelData[path]) {
      const worksheet = workbook.addWorksheet(method.toUpperCase());

      const arrayColumns: any = [];

      headerColumnTitles.forEach((element) => {
        arrayColumns.push({
          header: element,
          key: element
        });
      });

      worksheet.columns = arrayColumns;

      for (const statusCode in excelData[path][method]) {
        for (const key in excelData[path][method][statusCode]) {
          const statusCodeData = excelData[path][method][statusCode][key];
          const data = [
            statusCodeData.apiName,
            statusCodeData.testCaseName,
            // statusCodeData.description.join('\n'),
            statusCodeData.description,
            statusCodeData.preCondition,
            statusCodeData.assignedTo,
            statusCodeData.stepName,
            statusCodeData.type,
            statusCodeData.version,
            statusCodeData.testProvider,
            statusCodeData.approvalFlow
          ];

          worksheet.addRow(data);
        }
      }
    }

    if (Object.keys(excelData).length > 1) {
      workbook.xlsx.writeFile(`./excel/${apiName}-${index}.xlsx`);
      index++;
    } else {
      workbook.xlsx.writeFile(`./excel/${apiName}.xlsx`);
    }
  }
};
