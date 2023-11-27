export type SwaggerFile = {
  paths: {
    [path: string]: {
      [method: string]: any;
    };
  };
  components?: {
    schemas?: {
      [schemaName: string]: any;
    };
    responses?: {
      [responseName: string]: any;
    };
  };
};

export type RequestBodyItem = {
  example?: string;
  schema: string | string[];
  value?: any;
};

export type RequestBodyObject = {
  [method: string]: RequestBodyItem[];
};

export type ParameterItem = {
  name: string;
  in: string;
  description?: string;
  example?: string | string[];
};

export type ParametersObject = {
  [method: string]: ParameterItem[];
};

export type ParameterItemResume = {
  name: string;
  example?: string | string[];
};

export type ResponseItem = {
  statusCode: string;
  description: string;
  example?: string;
  value: any;
};

export type ResponsesObject = {
  [method: string]: ResponseItem[];
};

export type RequiredParametersObject = {
  [schemaName: string]: string | { [parameterName: string]: string };
};

export type PreCondition = {
  [method: string]: {
    statusCode: string;
    description: string;
    example?: string;
    value: any;
  }[];
};

export type Combinations = {
  [method: string]: ParameterItem[][];
};
