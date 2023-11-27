import { Request, Response } from "express";
import swaggerFile from "../data/mobile-subscribersoffer.json";
import {
  getAPIMethods,
  getAPIMethodsDescription,
  getAPIName,
  getPathsParameters,
  getRequestBody,
  getResponses,
  getSpecificUrl,
} from "../utils/swagger";

export const getAPINameSwagger = async (req: Request, res: Response) => {
  try {
    const apiName = await getAPIName(swaggerFile);

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
  try {
    const methods = await getAPIMethods(swaggerFile);

    if (!methods)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ methods });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getAPIMethodsDescriptionSwagger = async (
  req: Request,
  res: Response
) => {
  try {
    const descriptions = await getAPIMethodsDescription(swaggerFile);

    if (!descriptions)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ descriptions });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getSpecificUrlSwagger = async (req: Request, res: Response) => {
  try {
    const url = await getSpecificUrl(swaggerFile);

    if (!url)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ url });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getRequestBodySwagger = async (req: Request, res: Response) => {
  try {
    const resquestBody = await getRequestBody(swaggerFile);

    if (!resquestBody)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ resquestBody });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getPathsParametersSwagger = async (
  req: Request,
  res: Response
) => {
  try {
    const pathsParameters = await getPathsParameters(swaggerFile);

    if (!pathsParameters)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ pathsParameters });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getResponsesSwagger = async (req: Request, res: Response) => {
  try {
    const responses = await getResponses(swaggerFile);

    if (!responses)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    return res.status(200).json({ responses });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
