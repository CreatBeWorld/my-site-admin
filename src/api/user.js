import request from '@/utils/request'
export function getCaptcha() {
  return request({
    url: '/res/captcha',
    method: 'get'
  })
}
export function loginAPI(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}
//恢复登录状态
export function getInfoAPI() {
  return request({
    url: '/api/admin/whoami',
    method: 'get'
  })
}
// 更新管理员信息
export function updateInfo(data) {
  return request({
    method: 'put',
    url: '/api/admin',
    data
  })
}

