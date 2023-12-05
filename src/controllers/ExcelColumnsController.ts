import { Request, Response } from "express";
import { createDescriptionColumn } from "../utils/description";
import { createDescriptionDesignSteps } from "../utils/descriptionDesignSteps";
import { createExcelData } from "../utils/excel";
import { createExpectedResultDesignSteps } from "../utils/expectedResultDesignSteps";
import { createPreCondition } from "../utils/preCondition";
import { createTestCaseName } from "../utils/testCaseName";
import { getFirstFile } from "../utils/storage";

export const createPreConditionSwagger = async (
  req: Request,
  res: Response
) => {
  try {
    const { method }: any = req.query;
    const swaggerFile = await getFirstFile();
    const preCondition = await createPreCondition(swaggerFile);

    if (!preCondition)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    if (method) {
      return res
        .status(200)
        .json({ preCondition: { [method]: preCondition[method] } });
    }

    return res.status(200).json({ preCondition });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createTestCaseNameSwagger = async (
  req: Request,
  res: Response
) => {
  try {
    const swaggerFile = await getFirstFile();
    const testCaseName = await createTestCaseName(swaggerFile);

    if (!testCaseName)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ testCaseName });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createDescriptionColumnSwagger = async (
  req: Request,
  res: Response
) => {
  try {
    const swaggerFile = await getFirstFile();
    const description = await createDescriptionColumn(swaggerFile);

    if (!description)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ description });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createDescriptionDesignStepsSwagger = async (
  req: Request,
  res: Response
) => {
  try {
    const swaggerFile = await getFirstFile();
    const descriptionDesignSteps = await createDescriptionDesignSteps(
      swaggerFile
    );

    if (!descriptionDesignSteps)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ descriptionDesignSteps });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createExpectedResultDesignStepsSwagger = async (
  req: Request,
  res: Response
) => {
  try {
    const swaggerFile = await getFirstFile();
    const expectedResultDesignSteps = await createExpectedResultDesignSteps(
      swaggerFile
    );

    if (!expectedResultDesignSteps)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ expectedResultDesignSteps });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createExcelDataSwagger = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const excelData = await createExcelData(swaggerFile);

    if (!excelData)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ excelData });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
