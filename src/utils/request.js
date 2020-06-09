import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建Axios的实例对象,并设置默认默认的属性信息
const service = axios.create({
  withCredentials: true, // 跨域请求时,携带Cookis
  // timeout: 5000 // 请求超时设置
})

// request interceptor
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    const token = store.state.user.token;
    config.method = 'POST'//请求方式为 post 
    if (token) {
      config.headers['Hyren_userCookie'] = getToken();
    }
    return config;

  },
  error => {
    return Promise.error(error);
  })


// response interceptor
service.interceptors.response.use(
  
  response => {
    const res = response.data//得到响应数据
    if (res.code !== 200) {//检查请求的状态码,并根据每个状态码提示不同的消息处理
      const headers = response.headers
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '确认登出', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('login')
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      else if (res.code == 500) {//如果返回的状态是 500表示服务器异常
        Message({
          message: '服务器异常',
          type: 'error',
          duration: 5 * 1000
        })
      }
      else if (headers['content-type'] === 'APPLICATION/OCTET-STREAM;charset=utf-8'||headers['content-type'] === 'APPLICATION/OCTET-STREAM') {
        return response

      } else if (res.code == 220) {//如果返回的状态是 500表示服务器异常
        
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        
        return res;
      }
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service