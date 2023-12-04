import { Request, Response } from "express";
import { createExcelFile } from "../utils/excel";
import { getFirstFile } from "../utils/storage";

export const createExcelFileSwagger = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    await createExcelFile(swaggerFile);

    return res.status(200).json({ message: "File created!" });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
