import request from "@/utils/request"
//获取首页标语
export function getBanners() {
  return request.get('/api/banner')
}
export function setBanners(data) {
  return request.post('/api/banner',data)
}
