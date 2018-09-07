import request from '../utils/request';

export function userInfo() {
  return request('/auth/erp');
}
