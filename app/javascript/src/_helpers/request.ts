import reqwest, {BaseRequestOptions, GivenRequestOptions} from 'reqwest';

import authenticityToken from 'src/_helpers/authenticity_token';

function reloadPage() {
  window.location.reload();
}

function logError(error: Response) {
  // eslint-disable-next-line no-console
  console.log('error: ', error.statusText);
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
