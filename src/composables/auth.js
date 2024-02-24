import { useCookies } from '@vueuse/integrations/useCookies'
const Tokenkey="admin-token"
const cookie=useCookies()
//获取token
export function getToken(){
    return cookie.get(Tokenkey)
}
//设置token
export function setToken(token){
    return cookie.set(Tokenkey,token)
}
//移除token
export function removeToken(){
    return cookie.remove(Tokenkey)
}