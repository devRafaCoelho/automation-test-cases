export const getObjectsByKey = (obj: any, keyName: string): any[] => {
  if (obj && typeof obj === "object") {
    const result: any[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];

        if (key === keyName) {
          result.push(prop);
        } else if (typeof prop === "object") {
          result.push(...getObjectsByKey(prop, keyName));
        }
      }
    }

    return result;
  }

  return [];
};

export const createExampleResponse = (obj: any): Record<string, any> => {
  const exampleResponse: Record<string, any> = {};

  if (obj && obj.properties) {
    for (const key in obj.properties) {
      if (
        obj.properties.hasOwnProperty(key) &&
        typeof obj.properties[key] === "object"
      ) {
        if (obj.properties[key].type === "object") {
          exampleResponse[key] = createExampleResponse(obj.properties[key]);
        } else {
          exampleResponse[key] = obj.properties[key].hasOwnProperty("example")
            ? obj.properties[key].example
            : [];
        }
      }
    }
  }

  return exampleResponse;
};
