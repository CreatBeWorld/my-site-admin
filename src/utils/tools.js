//工具函数
export function formatDate(timestamp) {
  const date = new Date(+timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  const hour = (date.getHours() + '').padStart(2, '0')
  const minute = (date.getMinutes() + '').padStart(2, '0')
  const second = (date.getSeconds() + '').padStart(2, '0')
  const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const week = weekArr[date.getDay()]
  return `${year}-${month}-${day} ${hour}:${minute}:${second} ${week}`
}
