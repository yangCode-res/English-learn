import axios from "axios"
import {toast} from '~/composables/util'
import { getToken } from '~/composables/auth'
import store from './store'

const service =axios.create({
    baseURL:"/api",
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    
    const token=getToken()
    if(token){
        config.headers["admin-token"]=token
    }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    const msg=error.response.msg || "请求失败"
    console.log(msg)
    if (msg=="非法token，请先登录！"){
      console.log("识别成功")
      store.dispatch("logout").finally(()=>location.reload())
    }
    // 对响应错误做点什么
    toast(msg,'error')
    
                
    return Promise.reject(error);
  });
export default service