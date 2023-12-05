import { Request, Response } from "express";

import { getFirstFile } from "../utils/storage";
import { getAPIName } from "../utils/swagger";
import { createPathParameterCombinations } from "../utils/helpers";

export const test = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const combinations = await createPathParameterCombinations(swaggerFile);

    if (!combinations)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ combinations });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error." });
  }
};

export const testFiles = async (req: Request, res: Response) => {
  try {
    const files = await getFirstFile();

    if (!files)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ files });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
