import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  const hasUserInfo = store.getters.user
  if (to.meta.auth) {
    //需要鉴权
    if (hasUserInfo) {
      //用户信息存在，直接放行
      next()
    } else {
      //用户信息不存在,验证是否有token
      if (hasToken) {
        //token存在，判断token是否有效
        const res = await store.dispatch('user/getInfo')
        if (res.length > 0) {
          //token无效，跳转到登录页
          await store.dispatch('user/resetToken')
          Message.error(res)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        } else {
          //token有效,直接放行
          next()
        }
      } else {
        //token不存在
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    //无需鉴权
    if (to.path === '/login') {
      //进登入页，判断是否已登录
      if (hasUserInfo) {
        //已登录,直接跳转到首页
        next('/')
        NProgress.done()
      } else {
        //未登录，调转到登录页
        next()
      }
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
