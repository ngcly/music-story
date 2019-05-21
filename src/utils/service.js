import axios from 'axios'
import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'
import { Message } from 'element-ui';

const service = axios.create({
    // baseURL: 'https://api.ngcly.cn',
    baseURL: 'http://127.0.0.1:8070/',
    timeout: 5000
})

// http request 拦截器
service.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
        }
        return config;
    },
    err => {
        Message.error({
            center: true,
            message: '服务器请求无响应！'
        })
        return Promise.reject(err);
    });
  
  // http response 拦截器
  service.interceptors.response.use(
    response => {
        const res = response.data
        switch(res.code){
            case 200: return res
            case 401:
            // 返回 401 清除token信息并跳转到登录页面
            store.commit('SET_TOKEN',null);
            Message.error({
                message:res.msg,
                onClose: ()=> router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
            })
            break;
            default:
            Message.error({
                message:res.msg
            })
            break
        }
        return Promise.reject()
    },
    error => {
        Message.error({
            message: '服务器异常！',
            center: true
        })
        return Promise.reject(error)   // 返回接口返回的错误信息
    })

    export default service