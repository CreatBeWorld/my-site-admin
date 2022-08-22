import request from '@/utils/request'
//分页获取文章
export function getBlogs(page = 1, limit = 10) {
  return request({
    method: 'get',
    url: '/api/blog',
    params: { page, limit }
  })
}
// 添加文章
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}
// 编辑文章
export function editBlog({ id, data }) {
  return request({
    url: `/api/blog/${id}`,
    method: 'put',
    data
  })
}
// 获取单篇文章
export function getOneBlog(id) {
  return request({
    method: 'get',
    url: `/api/blog/${id}`
  })
}
//删除文章
export function deleteBlog(id) {
  return request({
    method: 'delete',
    url: `/api/blog/${id}`
  })
}
//获取文章分类
export function getBlogTypes() {
  return request({
    method: 'get',
    url: '/api/blogtype'
  })
}
//添加分类
export function addBlogType(data) {
  return request({
    method: 'post',
    url: '/api/blogtype',
    data
  })
}
//删除分类
export function deleteBlogType(id) {
  return request({
    method: 'delete',
    url: `/api/blogtype/${id}`
  })
}
//修改分类
export function editBlogType(id, data) {
  return request({
    method: 'put',
    url: `/api/blogtype/${id}`,
    data
  })
}
// 分页获取评论
export function getComments(page = 1, limit = 10) {
  return request({
    url: '/api/comment',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}
// 删除评论
export function deleteComment(id) {
  return request({
    method: 'delete',
    url: `/api/comment/${id}`
  })
}
