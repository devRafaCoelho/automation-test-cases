import { Request, Response } from "express";
import {
  getAPIMethods,
  getAPIMethodsDescription,
  getAPIName,
  getPathsParameters,
  getRequestBody,
  getResponses,
  getSpecificUrl,
} from "../utils/swagger";

import { getFirstFile } from "../utils/storage";

export const getAPINameSwagger = async (req: Request, res: Response) => {
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

export const getAPIMethodsSwagger = async (req: Request, res: Response) => {
  const swaggerFile = await getFirstFile();

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
  const swaggerFile = await getFirstFile();

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
  const swaggerFile = await getFirstFile();

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
  const swaggerFile = await getFirstFile();

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
  const { method }: any = req.query;
  const swaggerFile = await getFirstFile();

  try {
    const pathsParameters = await getPathsParameters(swaggerFile);

    if (!pathsParameters)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    if (method) {
      return res
        .status(200)
        .json({ pathsParameters: { [method]: pathsParameters[method] } });
    }

    return res.status(200).json({ pathsParameters });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getResponsesSwagger = async (req: Request, res: Response) => {
  const { statusCode }: any = req.query;
  const swaggerFile = await getFirstFile();

  try {
    const responses = await getResponses(swaggerFile);

    if (!responses)
      return res
        .status(400)
        .json({ error: { type: "file", message: "No files found." } });

    if (statusCode) {
      for (const method in responses) {
        responses[method] = responses[method].filter((element) => {
          return element.statusCode === statusCode;
        });
      }

      return res.status(200).json({ responses });
    }

    return res.status(200).json({ responses });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error." });
  }
};
