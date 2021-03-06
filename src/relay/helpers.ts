export const isMutation = (request: any): boolean => {
  return request.operationKind === 'mutation';
};

export const isQuery = (request: any): boolean => {
  return request.operationKind === 'query';
};

export const forceFetch = (cacheConfig: any): boolean => {
  return !!(cacheConfig && cacheConfig.force);
};

export const handleData = (response: any) => {
  const contentType = response.headers.get('content-type');
  if (contentType != null && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return response.text();
};

function getRequestBodyWithUploadables(
  request,
  variables,
  uploadables,
) {
  const formData = new FormData();
  if (__DEV__ && request.text != null) {
    formData.append('query', request.text);
  } else if (request.id != null) {
    formData.append('documentId', request.id);
  } else {
    formData.append('query', request.text);
  }
  formData.append('variables', JSON.stringify(variables));

  Object.keys(uploadables).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
      formData.append(key, uploadables[key]);
    }
  });

  return formData;
}

function getRequestBodyWithoutUplodables(request, variables): string {
  let body = {};
  if (__DEV__ && request.text != null) {
    body = { query: request.text, variables };
  } else if (request.id != null) {
    body = { documentId: request.id, variables };
  } else {
    body = { query: request.text, variables };
  }
  return JSON.stringify(body);
}

export function getRequestBody(
  request: any,
  variables: any,
  uploadables: any,
): string | FormData {
  if (uploadables) {
    return getRequestBodyWithUploadables(request, variables, uploadables);
  }
  return getRequestBodyWithoutUplodables(request, variables);
}

export const getHeaders = (uploadables: any) => {
  if (uploadables) {
    return {
      Accept: '*/*',
    };
  }
  return {
    Accept: 'application/json',
    'Content-type': 'application/json',
  };
};
