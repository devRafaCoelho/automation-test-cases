import { Request, Response } from "express";

import { createExpectedResultDesignSteps } from "../utils/expectedResultDesignSteps";
import { getFirstFile, listFiles } from "../utils/storage";
import { createPreCondition422 } from "../utils/preCondition";

export const test = async (req: Request, res: Response) => {
  const { method }: any = req.query;
  try {
    const swaggerFile = await getFirstFile();
    const preCondition422 = await createPreCondition422(swaggerFile);

    if (!preCondition422)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    if (method) {
      return res.status(200).json({
        preCondition422: {
          [method]: preCondition422[method],
        },
      });
    }

    return res.status(200).json({ preCondition422 });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error." });
  }
};

export const testFiles = async (req: Request, res: Response) => {
  try {
    const files = await listFiles();

    if (!files)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ files });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
