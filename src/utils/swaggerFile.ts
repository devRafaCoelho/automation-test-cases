import swagger from "../data/customers-risksanalysis-v1.json";
import { getFirstFile } from "./storage";

export const swaggerFile = swagger;

export const getSwaggerFile = async () => {
  const swaggerFile = await getFirstFile();
  return swaggerFile;
};
