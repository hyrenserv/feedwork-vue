//引入 js-cookie
import Cookies from 'js-cookie'
//定义cookie的key
const TokenKey = 'Hyren_userCookie'
//获取存储的cookie数据
export function getToken() {
  return Cookies.get(TokenKey)
}
//设置cookie信息
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
//清除cookie
export function removeToken() {
  return Cookies.remove(TokenKey)
}