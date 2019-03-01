import * as types from './mutation-types'

// 设置根级别的state
export const state = {
  'loginStatus': JSON.parse(localStorage.getItem('loginStatus') || '{}'),
  'userInfo': JSON.parse(localStorage.getItem('userInfo') || '{}'),
  'phone': localStorage.getItem('phone') || '',
  'email': localStorage.getItem('email') || '',
  'pwd': localStorage.getItem('pwd') || '',
  'avatar': localStorage.getItem('avatar') || ''
}

// 根级别的mutations
export const mutations = {
  // 登录
  [types.SET_LOGIN] (state, { loginStatus, userInfo }) {
    state.loginStatus = loginStatus
    state.userInfo = userInfo
    localStorage.setItem('loginStatus', JSON.stringify(state.loginStatus))
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  [types.UPDATE_USERINFO] (state, value) {
    if (localStorage.getItem('userInfo')) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      userInfo.user_realname = value
      state.userInfo = userInfo
      localStorage.removeItem('userInfo')
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  },
  [types.ADD_PHONE] (state, phone) {
    state.phone = phone
    localStorage.setItem('phone', phone)
  },
  [types.ADD_AVATAR] (state, avatar) {
    state.avatar = avatar
    localStorage.setItem('avatar', avatar)
  },
  [types.ADD_EMAIL] (state, email) {
    state.email = email
    localStorage.setItem('email', email)
  },
  [types.REMOVE_USERINFO] (state) {
    state.loginStatus = ''
    state.userInfo = ''
    localStorage.setItem('loginStatus', '')
    localStorage.setItem('userInfo', '')
  }
}
