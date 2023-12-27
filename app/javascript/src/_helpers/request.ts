import type {BaseRequestOptions} from 'reqwest';
import authenticityToken from 'src/_helpers/authenticity_token';
import reqwest from 'reqwest';

type RequestOptions = {
  data?: unknown;
  method?: 'GET';
  success: (data: any) => void;
};

function reloadPage(): void {
  window.location.reload();
}

function logError(error: DOMException): void {
  // eslint-disable-next-line no-console
  console.log('error: ', error);
}

function defaultRequestOptions(): BaseRequestOptions {
  return {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken(),
    },
    success: reloadPage,
    error: logError,
  };
}

export default function request(url: string, options: RequestOptions) {
  return reqwest({...defaultRequestOptions(), ...options, url});
}
