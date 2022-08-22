import { loginAPI, getInfoAPI } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: null
  }
}

const state = getDefaultState()

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  // 用户登录
  async login({ commit }, payload) {
    const res = await loginAPI(payload)
    if (typeof res === 'string') {
      return '验证码错误'
    } else {
      if (res.data) {
        commit('setUser', res.data)
        return ''
      } else {
        return '账号或密码错误'
      }
    }
  },
  // 恢复登录状态
  async getInfo({ commit }) {
    let res = await getInfoAPI()
    if (typeof res === 'string') {
      res = JSON.parse(res)
      if (res.code === 401) {
        return res.msg
      }
    } else {
      commit('setUser', res.data)
      return ''
    }
  },
  // 重置token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken()
      commit('resetState')
      resolve()
    })
  },
  // 退出登录
  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken()
      resetRouter() // 重置路由
      commit('resetState')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
