import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userAPI.login(userInfo).then(response => {
          const data = response.data;
          if(data.code===200){
            commit('SET_TOKEN', data.data.accessToken);
            resolve()
          }
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
