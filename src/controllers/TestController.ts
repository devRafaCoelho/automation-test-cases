import { Request, Response } from "express";

import { deleteAllFiles, getFirstFile, listFiles } from "../utils/storage";
import { getSchemaRequiredParameters } from "../utils/swagger";

export const test = async (req: Request, res: Response) => {
  const { method }: any = req.query;

  try {
    const swaggerFile = await getFirstFile();
    const requiredParameters = await getSchemaRequiredParameters(
      swaggerFile,
      swaggerFile.components?.schemas?.["error"]
    );

    if (!requiredParameters)
      return res
        .status(422)
        .json({ error: { type: "file", message: "No files found." } });

    if (method) {
      return res.status(422).json({
        requiredParameters: {
          [method]: requiredParameters[method],
        },
      });
    }

    return res.status(200).json({ requiredParameters });
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

export const testDelete = async (req: Request, res: Response) => {
  try {
    await deleteAllFiles();
    return res.status(200).json({ message: "Files deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
