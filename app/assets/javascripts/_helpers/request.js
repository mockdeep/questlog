'use strict';

import reqwest from 'reqwest';
import {extend} from 'lodash';

import authenticityToken from '_helpers/authenticity_token';

function mergeOptions(defaults, options) {
  return extend({}, defaults, options);
}

function reloadPage() {
  window.location.reload();
}

function logError(error) {
  // eslint-disable-next-line no-console
  console.log('error: ', error.statusText);
}

function defaultRequestOptions() {
  return {
    type: 'json',
    method: 'put',
    headers: {'X-CSRF-Token': authenticityToken()},
    success: reloadPage,
    error: logError
  };
}

export default function request(options) {
  return reqwest(mergeOptions(defaultRequestOptions(), options));
}
