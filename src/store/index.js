import { createStore } from 'vuex'
import {getUserInfo ,login} from '~/api/manager'
import{setToken } from '~/composables/auth'
import {removeToken} from "~/composables/auth"
import {useStore} from 'vuex'
const store = createStore({
    state () {
      return {
        //用户信息
        user:{},
        asideWidth:"250px",
        menus:[],
        ruleNames:[]
      }
    },
    mutations: {
        //记录用户信息
      SET_USERINFO(state,user){
        state.user=user
      },
      //展开或缩起侧边
      handleAsideWidth(state){
        state.asideWidth= state.asideWidth=="250px" ? "64px" :"250px"
      },
      SET_MENUS(state,menus){
            state.menus=menus
      },
      SET_RULENAMES(state,ruleNames){
        state.ruleNames=ruleNames
      }
    },
    actions:{
      login(commit,{username,password}){
          return new Promise((resolve, reject) => {
              login(username,password).then(res=>{
                  setToken(res.data.token)
                  resolve(res)
              }).catch(err=>(reject(err)))
          })
      },
      //获取当前登录用户信息
      getinfo({commit},username){
        return new Promise((resolve, reject) => {
          getUserInfo(username).then(res=>{
            commit("SET_USERINFO",res)
            resolve(res)
          }).catch(err=>reject(err))
        })
      },
      //推出登录
      logout({commit}){
          //移除cookie里面的token
          removeToken()
          //清楚当前用户状态vuex
          commit("SET_USERINFO",{})
      }
    }
  })
  export default store