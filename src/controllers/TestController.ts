import { Request, Response } from "express";

import { getFirstFile, uploadFile } from "../utils/storage";
import { getAPIName } from "../utils/swagger";

export const test = async (req: Request, res: Response) => {
  try {
    const apiName = await getAPIName();

    if (!apiName)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ apiName });
  } catch {
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
