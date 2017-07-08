import authenticityToken from 'src/_helpers/authenticity_token';

const FETCH_OPTIONS = {
  headers: new window.Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': authenticityToken(),
  }),
  credentials: 'same-origin',
};

function request(url, params) {
  const fetchResponse = window.fetch(url, {...params, ...FETCH_OPTIONS});

  return fetchResponse.then((response) => response.json());
}

function ajaxGet(url) {
  return request(url, {method: 'GET'});
}

function ajaxPut(url, data) {
  return request(url, {method: 'PUT', body: JSON.stringify(data)});
}

function ajaxPost(url, data) {
  return request(url, {method: 'POST', body: JSON.stringify(data)});
}

function ajaxDelete(url) {
  return request(url, {method: 'DELETE'});
}

export {ajaxGet, ajaxPut, ajaxPost, ajaxDelete};
