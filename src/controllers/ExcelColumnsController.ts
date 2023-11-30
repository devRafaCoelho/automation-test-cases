import { Request, Response } from "express";
import { createPreCondition } from "../utils/preCondition";
import { createTestCaseName } from "../utils/testCaseName";
import { createDescriptionColumn } from "../utils/description";
import { createDescriptionDesignSteps } from "../utils/descriptionDesignSteps";
import { createExpectedResultDesignSteps } from "../utils/expectedResultDesignSteps";
import { createExcelData } from "../utils/excel";

import { swaggerFile } from "../utils/swaggerFile";

export const createPreConditionSwagger = async (
  req: Request,
  res: Response
) => {
  try {
    const preCondition = await createPreCondition(swaggerFile);

    if (!preCondition)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

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
