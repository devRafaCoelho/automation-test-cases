import { Request, Response } from "express";
import { createExcelFile } from "../utils/excel";
import { createPreCondition200 } from "../utils/preCondition";

import { swaggerFile } from "../utils/swaggerFile";

export const testPOST = async (req: Request, res: Response) => {
  try {
    await createExcelFile(swaggerFile);

    return res.status(200).json({ message: "File created!" });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

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

// export const test = async (req: Request, res: Response) => {
//   const responses = await getResponses(swaggerFile);

//   try {
//     let response400Required: any = {};

//     for (const method in responses) {
//       const response400 = responses[method].filter((element) => {
//         return element.statusCode === "400";
//       });

//       if (response400.length > 1) {
//         for (const response of response400) {
//           const message = getObjectsByKey(response, "detailedMessage");

//           if (!message) {
//             return res
//               .status(400)
//               .json({ error: { type: "file", message: "No file found." } });
//           }

//           const validadeIncludes =
//             message[0].includes("obrigatório") ||
//             message[0].includes("Invalido");

//           if (validadeIncludes) {
//             response400Required = response.value;
//             return res.status(200).json({ response400Required });
//           }
//         }
//       } else if (response400.length === 1) {
//         response400Required = response400[0].value;
//         return res.status(200).json({ response400Required });
//       }
//     }
//   } catch {
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

// export const test = async (req: Request, res: Response) => {
//   try {
//     const headers = headersPrePagoPF;

//     const response = await axios.get(
//       "https://test.apigw.claro.com.br/test05/domains/v1/mobilesubscribers",
//       { headers }
//     );

//     if (!response) {
//       return res
//         .status(400)
//         .json({ error: { type: "file", message: "No files found." } });
//     }

//     console.log(returnPrePagoPF === returnPrePagoPF2);

//     return res.status(200).json(response.data);

//     // if (response.data === returnPrePagoPF) {
//     //   return res.status(200).json({ message: "Same answers." });
//     // } else {
//     //   return res.status(400).json({ message: "Different answers." });
//     // }
//   } catch {
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };
