import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '@/api/user'
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
        userAPI.login(userInfo).then(response => {
          const data = response.data;
          if(data.code===200){
            Cookies.set('token',data.data.accessToken);
            commit('SET_TOKEN', data.data.accessToken);
            resolve()
          }else{
            alert(data.msg)
            reject()
          }
        }).catch(error => {
          alert(error)
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
        userAPI.userInfo().then(response => {
          const data = response.data
          if(data.code===200){
            commit('SET_USER', data.data);
            resolve()
          }else{
            alert(data.msg)
            reject()
          }
        }).catch(error => {
          alert(error)
          reject(error)
        })
      })
    },
    //更新用户信息
    UpdateUser({commit}){
      return new Promise((resolve, reject) => {
        userAPI.UpdateUser().then(response => {
          const data = response.data
          if(data.code===200){
            commit('SET_USER', data.data);
            resolve()
          }else{
            reject(data.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
