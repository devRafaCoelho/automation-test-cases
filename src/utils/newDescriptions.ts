import { DescriptionColumn, SwaggerFile } from '../Types/types';
import { createObjectPathParameters, createPreCondition2 } from './newPreCondition';
import { getPathsParameters2 } from './newSwagger';
import { getSpecificUrl } from './swagger';

export const createDescriptionColumn2 = async (swaggerFile: SwaggerFile) => {
  const preConditions = await createPreCondition2(swaggerFile);
  const parameters = await getPathsParameters2(swaggerFile);
  const specificUrl = await getSpecificUrl(swaggerFile);

  const descriptionColumn: DescriptionColumn = {};

  for (const path in preConditions) {
    if (!descriptionColumn[path]) descriptionColumn[path] = {};

    for (const method in preConditions[path]) {
      if (!descriptionColumn[path][method]) descriptionColumn[path][method] = {};

      for (const statusCode in preConditions[path][method]) {
        let index = 1;

        switch (statusCode) {
          case '200':
          case '400':
          case '422':
            if (Object.values(parameters[path][method]).length > 0) {
              descriptionColumn[path][method][statusCode] = {};

              const queryParameters =
                parameters[path][method].length > 0
                  ? parameters[path][method].filter((param: any) => {
                      return param.in === 'query';
                    })
                  : null;

              const nameParameters = queryParameters?.map((element: any) => {
                return element.name;
              });

              for (const example in preConditions[path][method][statusCode]?.examples) {
                const queryUrl = [];
                for (const key in preConditions[path][method][statusCode]?.examples[example]) {
                  if (nameParameters.includes(key)) {
                    queryUrl.push(
                      `${key}=${preConditions[path][method][statusCode]?.examples[example][key]}`
                    );
                  }
                }

                descriptionColumn[path][method][statusCode][index] = {
                  data: [
                    swaggerFile.paths[path][method]?.summary,
                    'APIGEE',
                    method.toUpperCase(),
                    `${specificUrl[0]?.url}${path}?${queryUrl.join('&')}`
                  ]
                };
                index++;
              }
            } else {
              descriptionColumn[path][method][statusCode] = {
                data: [
                  swaggerFile.paths[path][method]?.summary,
                  'APIGEE',
                  method.toUpperCase(),
                  `${specificUrl[0]?.url}${path}`
                ]
              };
            }
            break;
          default:
            const data = [
              swaggerFile.paths[path][method]?.summary,
              'APIGEE',
              statusCode === '405' ? 'PATCH' : method.toUpperCase()
            ];

            if (statusCode === '403' || statusCode === '404') {
              data.push(preConditions[path][method][statusCode]?.example);
            } else {
              data.push(`${specificUrl[0]?.url}${path}`);
            }

            if (statusCode === '429') {
              data.push(`${specificUrl[0]?.url}${path}`);
              data.push(`${specificUrl[0]?.url}${path}`);
            }

            descriptionColumn[path][method][statusCode] = { data };
            break;
        }
      }
    }
  }

  return descriptionColumn;
};
