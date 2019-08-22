import { IAppFetchOptions } from "../../interfaces/IAppFetchOptions";

export const appFetch = (options: IAppFetchOptions) =>
  fetch(options.url, {
    headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: options.body,
    method: options.method
  })
  .then((response) => ({ response }))
  .then(function(response) {
    console.log(response);
    throw response;
  
  }).catch( err => {
    console.log(err);
  });
