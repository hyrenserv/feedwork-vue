import request from '@/utils/request'

/**
 * 
 * @param data.user_id  登陆的用户名
 * @param data.password  登陆的用户密码
 * 
 */
export function login(data) {
  return request({
    url: '/A/login/login',
    params : data
  })
}
export function getDefaultPage() {
  return request({
      url: '/A/login/getDefaultPage',
  })
}