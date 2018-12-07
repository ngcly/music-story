import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
  },
  mutations: {

  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        user.login(userInfo).then(response => {
          const data = response.data;
          commit('SET_TOKEN', data.token);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      // return new Promise((resolve) => {
      //   const { data } = await user.login(userInfo);
      //   commit('SET_TOKEN', data.token);
      //   resolve()
      // })
    },

  }
})
