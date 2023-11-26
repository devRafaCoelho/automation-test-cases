import { Request, Response } from "express";
import swaggerFile from "../data/mobile-subscribersoffer.json";
import { getAPIMethods, getAPIName } from "../utils/swagger";

export const getAPINameSwagger = async (req: Request, res: Response) => {
  const apiName = await getAPIName(swaggerFile);

  try {
    if (!apiName)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ apiName });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getAPIMethodsSwagger = async (req: Request, res: Response) => {
  const methods = await getAPIMethods(swaggerFile);

  try {
    if (!methods)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ methods });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
