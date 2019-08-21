import { IAppFetchOptions } from "../../interfaces/IAppFetchOptions";

export const appFetch = (options: IAppFetchOptions) =>
  fetch(options.url, {
    headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      Authorization: "true"
      
    },
    body: options.body,
    method: options.method
  })
    .then((response) => ({ response }))
    .catch((error) => {
      return error;
    });