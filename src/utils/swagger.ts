export const getAPIName = async (swaggerFile: any) => {
  const title = swaggerFile.info.title;
  return title ? title.split(" ").pop().replace(/\)$/, "") : "";
};

type SwaggerFile = {
  paths: {
    [path: string]: {
      [method: string]: any;
    };
  };
};

export const getAPIMethods = async (swaggerFile: SwaggerFile) => {
  const pathsValues = Object.values(swaggerFile.paths)[0];
  const methods = Object.keys(pathsValues);

  return methods;
};
