import { Request, Response } from "express";
import { createPreCondition200 } from "../utils/preCondition";

import { swaggerFile } from "../utils/swaggerFile";

export const test = async (req: Request, res: Response) => {
  try {
    const preCondition200 = await createPreCondition200(swaggerFile);

    if (!preCondition200)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ preCondition200 });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
