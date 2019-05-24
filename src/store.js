import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:Cookies.get('token') || null,
    user: {
      username:'',
      nickname:'',
      avatar:'',
      signature:'',
      roleList:[]
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state,user) => {
      state.user = user
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.login(userInfo).then(response => {
          const data = response.data;
          Cookies.set('token',data.accessToken);
          commit('SET_TOKEN', data.accessToken);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', null)
        Cookies.remove('token')
        resolve()
      })
    },
    //获取用户信息
    GetUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        api.userInfo().then(response => {
          // const data = response.data
          commit('SET_USER', response.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //更新用户信息
    UpdateUser({commit}){
      return new Promise((resolve, reject) => {
        api.UpdateUser().then(response => {
          // const data = response.data
          commit('SET_USER', response.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
