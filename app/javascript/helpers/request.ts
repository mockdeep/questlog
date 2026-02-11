import {authenticityToken} from './authenticity_token';

type BaseRequestOptions = {
  headers: Headers;
  credentials: 'same-origin';
};

type RequestOptions = {
  data?: unknown;
  method?: 'GET';
  success: (data: any) => void;
};

function defaultRequestOptions(): BaseRequestOptions {
  return {
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken(),
    }),
    credentials: 'same-origin',
  };
}

export function request(url: string, options: RequestOptions): void {
  const {success} = options;
  const body = JSON.stringify(options.data);
  const method = options.method ?? 'PUT';

  void fetch(url, {...defaultRequestOptions(), body, method})
    .then(response => { response.json().then(success); });
}
