import request from '@/utils/request'
// 分页获取评论
export function getMessages(page = 1, limit = 10) {
  return request({
    url: '/api/message',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}
// 删除评论
export function deleteMessage(id) {
  return request({
    method: 'delete',
    url: `/api/message/${id}`
  })
}