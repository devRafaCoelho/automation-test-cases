import { Request, Response } from "express";

import { createPathParameterCombinations2 } from "../utils/helpers";
import {
  createPreCondition2,
  createPreCondition200,
} from "../utils/newPreCondition";
import {
  getPathsParameters2,
  getRequestBody2,
  getResponses2,
} from "../utils/newSwagger";
import { deleteAllFiles, getFirstFile, listFiles } from "../utils/storage";

export const test = async (req: Request, res: Response) => {
  // const { method }: any = req.query;

  try {
    const swaggerFile = await getFirstFile();
    const preCondition200 = await createPreCondition200(swaggerFile);

    if (!preCondition200)
      return res
        .status(422)
        .json({ error: { type: "file", message: "No files found." } });

    // if (method) {
    //   return res.status(422).json({
    //     preCondition: {
    //       [method]: preCondition[method],
    //     },
    //   });
    // }

    return res.status(200).json({ preCondition200 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const testResponses = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const responses = await getResponses2(swaggerFile);

    if (!responses)
      return res
        .status(422)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ responses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const testRequestBody = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const requestBody = await getRequestBody2(swaggerFile);

    if (!requestBody)
      return res
        .status(422)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ requestBody });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const testParameters = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const parameters = await getPathsParameters2(swaggerFile);

    if (!parameters)
      return res
        .status(422)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ parameters });
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

export const testPreCondition = async (req: Request, res: Response) => {
  try {
    const swaggerFile = await getFirstFile();
    const preCondition = await createPreCondition2(swaggerFile);

    if (!preCondition)
      return res
        .status(422)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ preCondition });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
