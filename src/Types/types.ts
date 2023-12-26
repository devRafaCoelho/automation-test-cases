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
  schema?: any;
};

export type ParametersObject = {
  [method: string]: ParameterItem[];
};

export type ParametersObjectCombination = {
  [method: string]: any;
};

export type ParameterItemResume = {
  name: string;
  example?: string | string[];
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
    apiName: any;
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

export type MethodDescription = {
  [path: string]: {
    [method: string]: {
      description: string;
    };
  };
};

export type ResponseItem = {
  statusCode: string;
  description: string;
  example?: string;
  value: any;
};

export type ResponseItem2 = {
  [statusCode: string]: {
    [type: string]: {
      description: string;
      content?: {
        schema?: string;
        example?: string;
      };
    };
  };
};

export type ResponsesObject = {
  [method: string]: ResponseItem[];
};

export type PathResponse = {
  [path: string]: {
    [method: string]: {
      [statusCode: string]: {
        description: string;
        content?: {
          [type: string]: {
            schema?: string;
            example?: object;
            examples?: object;
          };
        };
      };
    };
  };
};

export type PathRequestBody = {
  [path: string]: {
    [method: string]: {
      requestBody?: {
        content?: {
          [type: string]: {
            schema?: string;
            example?: object;
            examples?: object;
          };
        };
      };
    };
  };
};

export type PathParameter = {
  [path: string]: {
    [method: string]: {
      parameters?: ParameterProps[];
    };
  };
};

export type ParameterProps = {
  name: string;
  in: string;
  required: string;
  example: string;
  schema: {
    enum?: any[];
  };
};
export type PreCondition2 = {
  [path: string]: {
    [method: string]: {
      [statusCode: string]: {
        statusCode?: string;
        description?: string;
        example?: string | { [key: string]: any };
        examples?: any;
      };
    };
  };
};

export type ObjectParameters = {
  [key: string]: string;
};

export type PreCondition400 = {
  [path: string]: {
    [method: string]: {
      [key: string]: any;
    };
  };
};
