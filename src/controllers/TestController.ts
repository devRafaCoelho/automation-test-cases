import { Request, Response } from "express";
import axios from "axios";
import swaggerFile from "../data/mobile-subscribersoffer.json";
import { createExcelFile2 } from "../utils/excel";

export const test = async (req: Request, res: Response) => {
  try {
    await createExcelFile2(swaggerFile);

    return res.status(200).json({ message: "File created!" });
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

const responsePrePagoPF = {
  apiVersion: "1;2022-07-04",
  transactionId: "508159bc-3f02-478b-a168-bc43170feaed",
  data: {
    subscribers: [
      {
        crmId: "381806791969303532443702032641",
        mobileId: "212124606",
        omsId: "986064627552758540451616035724",
        name: "BRUCE WAYNE",
        serviceType: "MOVEL",
        type: "CLARO_CONTA",
        subType: "CLARO_CARTAO",
        planCategory: "FLEX",
        effectiveSinceDate: "2020-03-13T00:00:00.000-03:00",
        expirationDate: "2010-03-15",
        documentationStatus: "COMPLETA",
        omsStatus: "AC",
        wppStatus: "ACTIVE",
        mobileStatus: "ACTIVE",
        productStatus: "ATIVO",
        reason: "SOLICITACAO_CLIENTE",
        omsReason: "SVCHC",
        wppReason: "SOL_CLIENTE",
        productStatusDate: "2020-03-13T00:00:00.000-03:00",
        msisdn: "11922223333",
        ticketAttendance: "1234",
        customer: {
          acrmCustomerId: "01234567890",
          crmCustomerId: "01234567890",
          mobileCustomerId: "308586112",
          name: "BRUCE WAYNE",
          customerType: "INDIVIDUAL",
          mobileCustomerType: "INDIVIDUAL",
          mobileCustomerSubType: "NORMAL",
          segmentationCustomerId: "PROFISSIONAL_LIBERAL",
          personType: "PF",
          documents: {
            cpf: "12345678900",
            rg: "558333126",
            passport: null,
          },
          mobileBan: "123456",
        },
      },
    ],
  },
};

const returnPrePagoPF = {
  apiVersion: "1;2022-07-04",
  transactionId: "eefa92d2-cd4b-4a25-9f81-68be3f117173",
  data: {
    subscribers: [
      {
        name: "TESTES SPED  FUNDO ",
        serviceType: "MOVEL",
        type: "CLARO_CONTA",
        effectiveSinceDate: "2011-02-28T00:00:00.000-03:00",
        productStatus: "CANCELADO",
        productStatusDate: "2011-02-28T00:00:00.000-03:00",
        reason: "SOLICITACAO_CLIENTE",
        expirationDate: "2011-02-28-03:00",
        ticketAttendance: "NULL",
        customer: {
          personType: "PF",
          documents: {
            cpf: "00000002216",
            rg: "NULL",
          },
          crmCustomerId: "536500660786941800003898139736",
          mobileCustomerId: "422033956",
          name: "TESTES SPED  FUNDO",
        },
        msisdn: "1191000005",
        crmId: "590685291861535054293938139734",
        mobileId: "0",
      },
    ],
  },
};

const returnPrePagoPF2 = {
  apiVersion: "1;2022-07-04",
  transactionId: "4a92f8ff-29da-4e02-bc1e-e5935d8cea1c",
  data: {
    subscribers: [
      {
        name: "TESTES SPED  FUNDO ",
        serviceType: "MOVEL",
        type: "CLARO_CONTA",
        effectiveSinceDate: "2011-02-28T00:00:00.000-03:00",
        productStatus: "CANCELADO",
        productStatusDate: "2011-02-28T00:00:00.000-03:00",
        reason: "SOLICITACAO_CLIENTE",
        expirationDate: "2011-02-28-03:00",
        ticketAttendance: "NULL",
        customer: {
          personType: "PF",
          documents: {
            cpf: "00000002216",
            rg: "NULL",
          },
          crmCustomerId: "536500660786941800003898139736",
          mobileCustomerId: "422033956",
          name: "TESTES SPED  FUNDO",
        },
        msisdn: "1191000005",
        crmId: "590685291861535054293938139734",
        mobileId: "0",
      },
    ],
  },
};

const responsePrePagoPJ = {
  apiVersion: "1;2022-07-04",
  transactionId: "508159bc-3f02-478b-a168-bc43170feaed",
  data: {
    subscribers: [
      {
        crmId: "381806791969303532443702032641",
        mobileId: "212124606",
        omsId: "986064627552758540451616035724",
        name: "BRUCE WAYNE",
        serviceType: "MOVEL",
        type: "CLARO_CONTA",
        subType: "CLARO_CARTAO",
        planCategory: "FLEX",
        effectiveSinceDate: "2020-03-13T00:00:00.000-03:00",
        expirationDate: "2010-03-15",
        documentationStatus: "COMPLETA",
        omsStatus: "AC",
        wppStatus: "ACTIVE",
        mobileStatus: "ACTIVE",
        productStatus: "ATIVO",
        reason: "SOLICITACAO_CLIENTE",
        omsReason: "SVCHC",
        wppReason: "SOL_CLIENTE",
        productStatusDate: "2020-03-13T00:00:00.000-03:00",
        msisdn: "11922223333",
        ticketAttendance: "1234",
        customer: {
          acrmCustomerId: "01234567890",
          crmCustomerId: "01234567890",
          mobileCustomerId: "308586112",
          name: "BRUCE WAYNE",
          customerType: "INDIVIDUAL",
          mobileCustomerType: "INDIVIDUAL",
          mobileCustomerSubType: "NORMAL",
          segmentationCustomerId: "PROFISSIONAL_LIBERAL",
          personType: "PJ",
          documents: {
            companyName: "ACME S/A",
            cnpj: "12345678000957",
          },
          mobileBan: "123456",
        },
      },
    ],
  },
};

const responsePosPagoPF = {
  apiVersion: "1;2022-07-04",
  transactionId: "508159bc-3f02-478b-a168-bc43170feaed",
  data: {
    subscribers: [
      {
        crmId: "381806791969303532443702032641",
        mobileId: "212124606",
        omsId: "986064627552758540451616035724",
        name: "BRUCE WAYNE",
        serviceType: "MOVEL",
        type: "CLARO_CONTA",
        subType: "CLARO_CARTAO",
        planCategory: "FLEX",
        effectiveSinceDate: "2020-03-13T00:00:00.000-03:00",
        expirationDate: "2010-03-15",
        documentationStatus: "COMPLETA",
        omsStatus: "AC",
        wppStatus: "ACTIVE",
        mobileStatus: "ACTIVE",
        productStatus: "ATIVO",
        reason: "SOLICITACAO_CLIENTE",
        omsReason: "SVCHC",
        mobileReason: "SOL_CLIENTE",
        productStatusDate: "2020-03-13T00:00:00.000-03:00",
        msisdn: "11922223333",
        ticketAttendance: "1234",
        customer: {
          acrmCustomerId: "01234567890",
          crmCustomerId: "01234567890",
          mobileCustomerId: "308586112",
          name: "BRUCE WAYNE",
          customerType: "INDIVIDUAL",
          mobileCustomerType: "INDIVIDUAL",
          mobileCustomerSubType: "NORMAL",
          segmentationCustomerId: "PROFISSIONAL_LIBERAL",
          personType: "PF",
          documents: {
            cpf: "12345678900",
            rg: "558333126",
            passport: null,
          },
          mobileBan: "123456",
        },
        ticketinclaro: "5367",
        titularId: true,
      },
    ],
  },
};

const responsePosPagoPJ = {
  apiVersion: "1;2022-07-04",
  transactionId: "508159bc-3f02-478b-a168-bc43170feaed",
  data: {
    subscribers: [
      {
        crmId: "381806791969303532443702032641",
        mobileId: "212124606",
        omsId: "986064627552758540451616035724",
        name: "BRUCE WAYNE",
        serviceType: "MOVEL",
        type: "CLARO_CONTA",
        subType: "CLARO_CARTAO",
        planCategory: "FLEX",
        effectiveSinceDate: "2020-03-13T00:00:00.000-03:00",
        expirationDate: "2010-03-15",
        documentationStatus: "COMPLETA",
        omsStatus: "AC",
        wppStatus: "ACTIVE",
        mobileStatus: "ACTIVE",
        productStatus: "ATIVO",
        reason: "SOLICITACAO_CLIENTE",
        omsReason: "SVCHC",
        mobileReason: "SOL_CLIENTE",
        productStatusDate: "2020-03-13T00:00:00.000-03:00",
        msisdn: "11922223333",
        ticketAttendance: "1234",
        customer: {
          acrmCustomerId: "01234567890",
          crmCustomerId: "01234567890",
          mobileCustomerId: "308586112",
          name: "BRUCE WAYNE",
          customerType: "INDIVIDUAL",
          mobileCustomerType: "INDIVIDUAL",
          mobileCustomerSubType: "NORMAL",
          segmentationCustomerId: "PROFISSIONAL_LIBERAL",
          personType: "PJ",
          documents: {
            companyName: "ACME S/A",
            cnpj: "12345678000957",
          },
          mobileBan: "123456",
        },
        ticketinclaro: "5367",
      },
    ],
  },
};

const responseControlePF = {
  apiVersion: "1;2022-07-04",
  transactionId: "508159bc-3f02-478b-a168-bc43170feaed",
  data: {
    subscribers: [
      {
        crmId: "381806791969303532443702032641",
        mobileId: "212124606",
        omsId: "986064627552758540451616035724",
        name: "BRUCE WAYNE",
        serviceType: "MOVEL",
        type: "CLARO_CONTA",
        subType: "CLARO_CARTAO",
        planCategory: "FLEX",
        effectiveSinceDate: "2020-03-13T00:00:00.000-03:00",
        expirationDate: "2010-03-15",
        documentationStatus: "COMPLETA",
        omsStatus: "AC",
        wppStatus: "ACTIVE",
        mobileStatus: "ACTIVE",
        productStatus: "ATIVO",
        reason: "SOLICITACAO_CLIENTE",
        omsReason: "SVCHC",
        mobileReason: "SOL_CLIENTE",
        productStatusDate: "2020-03-13T00:00:00.000-03:00",
        msisdn: "11922223333",
        ticketAttendance: "1234",
        customer: {
          acrmCustomerId: "01234567890",
          crmCustomerId: "01234567890",
          mobileCustomerId: "308586112",
          name: "BRUCE WAYNE",
          customerType: "INDIVIDUAL",
          mobileCustomerType: "INDIVIDUAL",
          mobileCustomerSubType: "NORMAL",
          segmentationCustomerId: "PROFISSIONAL_LIBERAL",
          personType: "PF",
          documents: {
            cpf: "12345678900",
            rg: "558333126",
            passport: null,
          },
          mobileBan: "123456",
        },
        ticketinclaro: "5367",
        titularId: true,
      },
    ],
  },
};

const responseControlePJ = {
  apiVersion: "1;2022-07-04",
  transactionId: "508159bc-3f02-478b-a168-bc43170feaed",
  data: {
    subscribers: [
      {
        crmId: "381806791969303532443702032641",
        mobileId: "212124606",
        omsId: "986064627552758540451616035724",
        name: "BRUCE WAYNE",
        serviceType: "MOVEL",
        type: "CLARO_CONTA",
        subType: "CLARO_CARTAO",
        planCategory: "FLEX",
        effectiveSinceDate: "2020-03-13T00:00:00.000-03:00",
        expirationDate: "2010-03-15",
        documentationStatus: "COMPLETA",
        omsStatus: "AC",
        wppStatus: "ACTIVE",
        mobileStatus: "ACTIVE",
        productStatus: "ATIVO",
        reason: "SOLICITACAO_CLIENTE",
        omsReason: "SVCHC",
        mobileReason: "SOL_CLIENTE",
        productStatusDate: "2020-03-13T00:00:00.000-03:00",
        msisdn: "11922223333",
        ticketAttendance: "1234",
        customer: {
          acrmCustomerId: "01234567890",
          crmCustomerId: "01234567890",
          mobileCustomerId: "308586112",
          name: "BRUCE WAYNE",
          customerType: "INDIVIDUAL",
          mobileCustomerType: "INDIVIDUAL",
          mobileCustomerSubType: "NORMAL",
          segmentationCustomerId: "PROFISSIONAL_LIBERAL",
          personType: "PJ",
          documents: {
            companyName: "ACME S/A",
            cnpj: "12345678000957",
          },
          mobileBan: "123456",
        },
        ticketinclaro: "5367",
      },
    ],
  },
};

const headersPrePagoPF = {
  accept: "application/json",
  "X-QueryString": "msisdn=1191000005",
  Authorization:
    "Basic ZmdPR2Jnd2k2NmR4V290Y2ZXRnNqV0R4WGFHc0FPZ0E6WWFvaFozWjM3TzRZRTNzbA==",
};

const headersPrePagoPJ = {
  accept: "application/json",
  "X-QueryString": "msisdn=1191000004",
  Authorization:
    "Basic ZmdPR2Jnd2k2NmR4V290Y2ZXRnNqV0R4WGFHc0FPZ0E6WWFvaFozWjM3TzRZRTNzbA==",
};

const headersPosPagoPF = {
  accept: "application/json",
  "X-QueryString": "msisdn=11913013797",
  Authorization:
    "Basic ZmdPR2Jnd2k2NmR4V290Y2ZXRnNqV0R4WGFHc0FPZ0E6WWFvaFozWjM3TzRZRTNzbA==",
};

const headersPosPagoPJ = {
  accept: "application/json",
  "X-QueryString": "msisdn=1191000023",
  Authorization:
    "Basic ZmdPR2Jnd2k2NmR4V290Y2ZXRnNqV0R4WGFHc0FPZ0E6WWFvaFozWjM3TzRZRTNzbA==",
};

const headersControlePF = {
  accept: "application/json",
  "X-QueryString": "msisdn=11913013806",
  Authorization:
    "Basic ZmdPR2Jnd2k2NmR4V290Y2ZXRnNqV0R4WGFHc0FPZ0E6WWFvaFozWjM3TzRZRTNzbA==",
};

const headersControlePJ = {
  accept: "application/json",
  "X-QueryString": "msisdn=11913013806",
  Authorization:
    "Basic ZmdPR2Jnd2k2NmR4V290Y2ZXRnNqV0R4WGFHc0FPZ0E6WWFvaFozWjM3TzRZRTNzbA==",
};
