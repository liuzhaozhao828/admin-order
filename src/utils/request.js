import fetch from 'dva/fetch';
import { message } from 'antd'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  message.error(response.status)
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function checkCode(data) {
  const { code, msg } = data
  if (code!=='000000') {
    message.error(msg)
  }

  return { data }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, param, options) {
  options = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include',
    method:"post",
    body: JSON.stringify(param)
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .catch(err =>
      ({ err, data: {} })
    );
}
