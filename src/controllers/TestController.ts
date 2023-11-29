import { Request, Response } from "express";
import { createExcelFile } from "../utils/excel";

// import swaggerFile from "../data/customers-risksanalysis-v1.json";
// import swaggerFile from "../data/mobile-cpccustomersmigr.json";
// import swaggerFile from "../data/mobile-eirequipments-v1.json";
import swaggerFile from "../data/mobile-subscribersoffer.json";
// import swaggerFile from "../data/party-employeesworkhistoricals-v1.json";
// import swaggerFile from "../data/party-parties-v1.json";

export const test = async (req: Request, res: Response) => {
  try {
    await createExcelFile(swaggerFile);

    return res.status(200).json({ message: "File created!" });
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};

// export const test = async (req: Request, res: Response) => {
//   try {
//     const preconditions = await createPreCondition400(swaggerFile);

//     if (!preconditions) {
//       return res
//         .status(400)
//         .json({ error: { type: "file", message: "No file found." } });
//     }

//     return res.status(200).json({ preconditions });
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
