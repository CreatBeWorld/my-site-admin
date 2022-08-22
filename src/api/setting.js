import request from "@/utils/request"
// 获取全局设置
export function getSettings() {
  return request.get('/api/setting')
}
// 修改全局设置
export function editSettings(data) {
  return request({
    method: 'put',
    url: '/api/setting',
    data
  })
}