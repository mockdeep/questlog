import type {BaseRequestOptions} from 'reqwest';
import authenticityToken from 'src/_helpers/authenticity_token';
import reqwest from 'reqwest';

type RequestOptions = {
  data?: unknown;
  method?: 'GET';
  success: (data: any) => void;
};

function logError(error: DOMException): void {
  // eslint-disable-next-line no-console
  console.log('error: ', error);
}

function defaultRequestOptions(): BaseRequestOptions {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken(),
    },
    error: logError,
  };
}

export default function request(url: string, options: RequestOptions) {
  const {data, success} = options;
  const method = options.method ?? 'PUT';

  return reqwest({...defaultRequestOptions(), method, success, data, url});
}
