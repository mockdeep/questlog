import type {BaseRequestOptions, GivenRequestOptions} from 'reqwest';
import authenticityToken from 'src/_helpers/authenticity_token';
import reqwest from 'reqwest';

function reloadPage(): void {
  window.location.reload();
}

function logError(error: DOMException): void {
  // eslint-disable-next-line no-console
  console.log('error: ', error);
}

function defaultRequestOptions(): BaseRequestOptions {
  return {
    type: 'json',
    method: 'put',
    headers: {'X-CSRF-Token': authenticityToken()},
    success: reloadPage,
    error: logError,
  };
}

export default function request(options: GivenRequestOptions) {
  return reqwest({...defaultRequestOptions(), ...options});
}
