import { Request, Response } from "express";
import swaggerFile from "../data/mobile-subscribersoffer.json";
import { createExcelData } from "../utils/excel";

export const test = async (req: Request, res: Response) => {
  try {
    const excelData = await createExcelData(swaggerFile);

    if (!excelData) {
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });
    }

    return res.status(200).json({ excelData });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
