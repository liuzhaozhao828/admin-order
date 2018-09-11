import request from '../utils/request';

export function userInfo() {
  return request('/admin/common/getUserInfo');
}

export function logout() {
  return request('/admin/common/logout');
}
