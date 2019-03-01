import * as types from './mutation-types'

// 登录
export const setLogin = ({commit}, data) => {
  commit(types.SET_LOGIN, data)
}

export const updateUserInfo = ({commit}, data) => {
  commit(types.UPDATE_USERINFO, data)
}

export const removeUserInfo = ({commit}) => {
  commit(types.REMOVE_USERINFO)
}
