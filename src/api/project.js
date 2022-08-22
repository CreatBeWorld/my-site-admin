import request from '@/utils/request'
// 获取所有项目
export function getProjects() {
  return request({
    url: '/api/project',
    method: 'get'
  })
}
// 修改项目
export function editProject(id, data) {
  return request({
    method: 'put',
    url: `/api/project/${id}`,
    data
  })
}
// 新增项目
export function addProject(data) {
  return request({
    method: 'post',
    url: '/api/project',
    data
  })
}
// 删除项目
export function deleteProject(id) {
  return request({
    method: 'delete',
    url: `/api/project/${id}`
  })
}
