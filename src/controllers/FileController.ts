import { Request, Response } from "express";
import { deleteAllFiles, getFirstFile, uploadFile } from "../utils/storage";

export const uploadSwaggerFile = async (req: Request, res: Response) => {
  const { file } = req;

  try {
    await deleteAllFiles();

    const fileUploaded = await uploadFile(
      file?.originalname,
      file?.buffer,
      file?.mimetype
    );

    return res.status(201).json(fileUploaded);
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getSwaggerData = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();

    if (!swaggerFile)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ swaggerFile });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
