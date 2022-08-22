import request from '@/utils/request'
// 获取关于页面的url
export function getUrl() {
  return request.get('/api/about')
}
// 设置关于页面的url
export function editUrl(data) {
  return request({
    method: 'post',
    url: '/api/about',
    data
  })  
}