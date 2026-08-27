import {authenticityToken} from "./authenticity_token";

const FETCH_OPTIONS: RequestInit = {
  headers: new window.Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-Token": authenticityToken(),
  }),
  credentials: "same-origin",
};

function request(url: string, params: RequestInit) {
  const fetchResponse = window.fetch(url, {...params, ...FETCH_OPTIONS});

  return fetchResponse.then(response => response.json());
}

function ajaxPut(url: string, data: AjaxData) {
  return request(url, {method: "PUT", body: JSON.stringify(data)});
}

function ajaxDelete(url: string) {
  return request(url, {method: "DELETE"});
}

export {ajaxPut, ajaxDelete};
