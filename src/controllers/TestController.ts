import { Request, Response } from "express";
import swaggerFile from "../data/mobile-subscribersoffer.json";
import { createPreCondition } from "../utils/preCondition";

export const test = async (req: Request, res: Response) => {
  try {
    const preConditions = await createPreCondition(swaggerFile);

    if (!preConditions) {
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });
    }

    return res.status(200).json({ preConditions });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
