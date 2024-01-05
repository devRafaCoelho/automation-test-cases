import { Request, Response } from 'express';

import { createDescriptionColumn2 } from '../utils/newDescriptions';
import { createExcelData2, createExcelFile2 } from '../utils/newExcel';
import { createExpectedResultDesignSteps2 } from '../utils/newExpectedResultDesignSteps';
import { createPreCondition2 } from '../utils/newPreCondition';
import { getPathsParameters2, getRequestBody2, getResponses2 } from '../utils/newSwagger';
import { createTestCaseName2 } from '../utils/newTestCaseName';
import { deleteAllFiles, getFirstFile, listFiles } from '../utils/storage';

export const test = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const expectedResultDesignSteps = await createExpectedResultDesignSteps2(swaggerFile);

    if (!expectedResultDesignSteps)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ expectedResultDesignSteps });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// export const test = async (req: Request, res: Response) => {
//   const { statusCode } = req.query;

//   try {
//     const swaggerFile = await getFirstFile();

//     const specificPreCondition = async (statusCode: any) => {
//       switch (statusCode) {
//         case "200":
//           const preCondition200 = await createPreCondition200(swaggerFile);

//           if (!preCondition200)
//             return res
//               .status(400)
//               .json({ error: { type: "file", message: "No files found." } });

//           return res.status(200).json({ preCondition200 });
//         case "400":
//           const preCondition400 = await createPreCondition400(swaggerFile);

//           if (!preCondition400)
//             return res
//               .status(400)
//               .json({ error: { type: "file", message: "No files found." } });

//           return res.status(200).json({ preCondition400 });
//         case "422":
//           const preCondition422 = await createPreCondition422(swaggerFile);

//           if (!preCondition422)
//             return res.status(400).json({
//               error: {
//                 type: "preCondition",
//                 message: "No Pre Conditions found.",
//               },
//             });

//           return res.status(200).json({ preCondition422 });
//         default:
//           return res.status(400).json({
//             error: {
//               type: "preCondition",
//               message: "No Pre Conditions found.",
//             },
//           });
//       }
//     };

//     await specificPreCondition(statusCode);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

export const testResponses = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const responses = await getResponses2(swaggerFile);

    if (!responses)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ responses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testRequestBody = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const requestBody = await getRequestBody2(swaggerFile);

    if (!requestBody)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ requestBody });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testParameters = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const parameters = await getPathsParameters2(swaggerFile);

    if (!parameters)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ parameters });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testFiles = async (req: Request, res: Response) => {
  try {
    const files = await listFiles();

    if (!files)
      return res.status(400).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ files });
  } catch {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testDelete = async (req: Request, res: Response) => {
  try {
    await deleteAllFiles();
    return res.status(200).json({ message: 'Files deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testPreCondition = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const preCondition = await createPreCondition2(swaggerFile);

    if (!preCondition)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ preCondition });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testTestCaseName = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const testCaseName = await createTestCaseName2(swaggerFile);

    if (!testCaseName)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ testCaseName });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testDescriptionColumn = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const descriptions = await createDescriptionColumn2(swaggerFile);

    if (!descriptions)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ descriptions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testExcelData = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const excelData = await createExcelData2(swaggerFile);

    if (!excelData)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    return res.status(200).json({ excelData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const testExcelFile = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();

    if (!swaggerFile)
      return res.status(422).json({ error: { type: 'file', message: 'No files found.' } });

    await createExcelFile2(swaggerFile);

    return res.status(201).json({ message: 'File created!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
