import { ExcelData, SwaggerFile } from "../Types/types";
import { createDescriptionColumn } from "./description";
import { createDescriptionDesignSteps } from "./descriptionDesignSteps";
import { createExpectedResultDesignSteps } from "./expectedResultDesignSteps";
import { createPreCondition } from "./preCondition";
import { getAPIName } from "./swagger";
import { createTestCaseName } from "./testCaseName";
import ExcelJS from "exceljs";

export const createExcelData = async (
  swaggerFile: SwaggerFile
): Promise<ExcelData> => {
  const apiName = await getAPIName(swaggerFile);
  const testCaseNames = await createTestCaseName(swaggerFile);
  const descriptions = await createDescriptionColumn(swaggerFile);
  const preConditions = await createPreCondition(swaggerFile);
  const descriptionDesignSteps = await createDescriptionDesignSteps(
    swaggerFile
  );
  const expectedResultDesignSteps = await createExpectedResultDesignSteps(
    swaggerFile
  );
  const excelData: ExcelData = {};

  for (const method in preConditions) {
    excelData[method] = [];

    preConditions[method].forEach((element, index) => {
      excelData[method].push({
        apiName,
        testCaseName: testCaseNames[method][index],
        description: descriptions[method][index].example || [],
        preCondition: element.value,
        assignedTo: "Z415515",
        stepName: "Step 1",
        descriptionDesignSteps:
          descriptionDesignSteps[method][index].value || [],
        expectedResultDesignSteps:
          expectedResultDesignSteps[method][index].value || [],
        type: "MANUAL",
        version: "1",
        testProvider: "Hitss",
        approvalFlow: "Novo",
      });
    });
  }

  return excelData;
};

// export const createExcelFile = async (swaggerFile: SwaggerFile) => {
//   const apiName = await getAPIName(swaggerFile);
//   const excelData = await createExcelData(swaggerFile);

//   const headerColumnTitles = [
//     "Subject",
//     "Test Name",
//     "Description",
//     "Pré Condição",
//     "Atribuído à",
//     "Step Name (Design Steps)",
//     "Description (Design Steps)",
//     "Expected Result (Design Steps)",
//     "Type",
//     "Versão",
//     "Fornecedor de Testes",
//     "Fluxo de Aprovação",
//   ];

//   const workbook = new ExcelJS.Workbook();

//   for (const method in excelData) {
//     const worksheet = workbook.addWorksheet(method.toUpperCase());
//     worksheet.addRow(headerColumnTitles);

//     excelData[method].forEach((element: any) => {
//       const data = [
//         element.apiName,
//         element.testCaseName,
//         element.description.join("\n"),
//         Array.isArray(element.preCondition)
//           ? element.preCondition.join("\n")
//           : element.preCondition,
//         element.assignedTo,
//         element.stepName,
//         element.descriptionDesignSteps.join("\n"),
//         element.expectedResultDesignSteps.join("\n"),
//         element.type,
//         element.version,
//         element.testProvider,
//         element.approvalFlow,
//       ];

//       worksheet.addRow(data);
//     });
//   }

//   workbook.xlsx.writeFile(`${apiName}.xlsx`);
// };

export const createExcelFile = async (swaggerFile: SwaggerFile) => {
  const apiName = await getAPIName(swaggerFile);
  const excelData = await createExcelData(swaggerFile);

  const headerColumnTitles = [
    "Subject",
    "Test Name",
    "Description",
    "Pré Condição",
    "Atribuído à",
    "Step Name (Design Steps)",
    "Description (Design Steps)",
    "Expected Result (Design Steps)",
    "Type",
    "Versão",
    "Fornecedor de Testes",
    "Fluxo de Aprovação",
  ];

  const headerColumnTitlesAlign = [
    "Subject",
    "Atribuído à",
    "Step Name (Design Steps)",
    "Type",
    "Versão",
    "Fornecedor de Testes",
    "Fluxo de Aprovação",
  ];

  const workbook = new ExcelJS.Workbook();

  for (const method in excelData) {
    const worksheet = workbook.addWorksheet(method.toUpperCase());

    const arrayColumns: any = [];

    headerColumnTitles.forEach((element) => {
      arrayColumns.push({
        header: element,
        key: element,
      });
    });

    worksheet.columns = arrayColumns;

    worksheet.getRow(1).eachCell((cell) => {
      (cell.style = {
        font: { bold: true },
        alignment: { vertical: "middle", horizontal: "center" },
      }),
        (cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "0398fc" },
        });
    });

    excelData[method].forEach((element: any) => {
      const data = [
        element.apiName,
        element.testCaseName,
        element.description.join("\n"),
        Array.isArray(element.preCondition)
          ? element.preCondition.join("\n")
          : typeof element.preCondition === "string"
          ? element.preCondition
          : JSON.stringify(element.preCondition, null, 2),
        element.assignedTo,
        element.stepName,
        element.descriptionDesignSteps.join("\n"),
        element.expectedResultDesignSteps.join("\n"),
        element.type,
        element.version,
        element.testProvider,
        element.approvalFlow,
      ];

      worksheet.addRow(data);
    });

    headerColumnTitles.forEach((headerName) => {
      let maxLength = headerName.length;

      worksheet.getColumn(headerName).eachCell((cell, cellNumber) => {
        const cellLength = cell.value ? cell.value.toString().length : 0;

        if (cellLength > maxLength && cellLength <= 100) {
          maxLength = cellLength;
        } else if (cellLength > 100) {
          maxLength = 100;
        }

        if (cellNumber > 1) {
          headerColumnTitlesAlign.includes(headerName)
            ? (cell.alignment = { vertical: "middle", horizontal: "center" })
            : (cell.alignment = { vertical: "top", horizontal: "left" });
        }
      });

      worksheet.getColumn(headerName).width = maxLength + 2;
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.height = 50;
      }
    });
  }

  workbook.xlsx.writeFile(`${apiName}.xlsx`);
};
