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

export type TestCaseName = {
  [method: string]: string[];
};

export type Description = {
  [method: string]: {
    statusCode: string;
    example?: string[];
  }[];
};

export type DescriptionDesignSteps = {
  [method: string]: {
    statusCode: string;
    value?: string[];
  }[];
};

export type ExpectedResultDesignSteps = {
  [method: string]: {
    statusCode: string;
    value?: string[];
  }[];
};

export type ExcelData = {
  [method: string]: {
    apiName: string;
    testCaseName: string;
    description: string[];
    preCondition: string | object;
    assignedTo: string;
    stepName: string;
    descriptionDesignSteps: string[];
    expectedResultDesignSteps: string[];
    type: string;
    version: string;
    testProvider: string;
    approvalFlow: string;
  }[];
};

export type ResponseMessage = {
  [key: string]: {
    value: object;
  };
};
export type Response400 = {
  [key: string]: {
    $ref: string;
  };
};
