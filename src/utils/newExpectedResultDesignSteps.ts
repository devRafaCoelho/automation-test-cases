import { ExpectedResultDesignSteps2, SwaggerFile } from '../Types/types';
import { getObjectsByKey } from './helpers';
import { createPreCondition2 } from './newPreCondition';
import { getResponses2 } from './newSwagger';

export const createExpectedResultDesignSteps2 = async (swaggerFile: SwaggerFile) => {
  const preConditions = await createPreCondition2(swaggerFile);
  const responses = await getResponses2(swaggerFile);
  const expectedResultDesignSteps: ExpectedResultDesignSteps2 = {};

  for (const path in preConditions) {
    if (!expectedResultDesignSteps[path]) expectedResultDesignSteps[path] = {};

    for (const method in preConditions[path]) {
      if (!expectedResultDesignSteps[path][method]) expectedResultDesignSteps[path][method] = {};

      for (const statusCode in preConditions[path][method]) {
        if (!expectedResultDesignSteps[path][method][statusCode])
          expectedResultDesignSteps[path][method][statusCode] = {};

        const message =
          statusCode === '200' ? 'Busca apresenta sucesso.' : 'Busca apresenta falha.';

        const expectedResultData = [`1 - ${message}`, '2 - Response retorna os seguintes valores:'];

        if (preConditions[path][method][statusCode]?.example) {
          const example = getObjectsByKey(responses[path][method][statusCode], 'example');
          expectedResultData.push(JSON.stringify(example[0], null, 2));
          expectedResultData.push(`APIGEE = ${statusCode}`);

          expectedResultDesignSteps[path][method][statusCode] = expectedResultData;
        }
      }
    }
  }

  return expectedResultDesignSteps;
};
