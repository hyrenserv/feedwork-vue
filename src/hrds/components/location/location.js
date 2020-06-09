import request from '@/utils/request'
export function getDefaultPage() {
    return request({
        url: '/A/login/getDefaultPage',
    })
  }