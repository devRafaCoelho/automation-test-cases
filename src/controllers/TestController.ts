import { Request, Response } from "express";
import { createExcelFile } from "../utils/excel";
import { createPreCondition400 } from "../utils/preCondition";
import { getObjectsByKey } from "../utils/helpers";
import { Response400, ResponseMessage } from "../Types/types";
import { getResponses } from "../utils/swagger";

// import swaggerFile from "../data/customers-risksanalysis-v1.json";
// import swaggerFile from "../data/mobile-cpccustomersmigr.json";
// import swaggerFile from "../data/mobile-eirequipments-v1.json";
import swaggerFile from "../data/mobile-subscribersoffer.json";
// import swaggerFile from "../data/party-employeesworkhistoricals-v1.json";
// import swaggerFile from "../data/party-parties-v1.json";

export const testPOST = async (req: Request, res: Response) => {
  try {
    await createExcelFile(swaggerFile);

    return res.status(200).json({ message: "File created!" });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const test = async (req: Request, res: Response) => {
  const responses = await getResponses(swaggerFile);

  try {
    let response400Required: any = {};

    for (const method in responses) {
      const response400 = responses[method].filter((element) => {
        return element.statusCode === "400";
      });

      response400.forEach((response) => {
        const message = getObjectsByKey(response, "detailedMessage");

        if (!message) {
          return res
            .status(400)
            .json({ error: { type: "file", message: "No file found." } });
        }

        if (message[0].includes("obrigatório")) {
          response400Required = response.value;
        }
      });
    }

    return res.status(200).json({ response400Required });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

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
