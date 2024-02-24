import { router } from "~/router";
import { getToken } from "~/composables/auth";
import { toast, showFullloading, hideFullloading } from "~/composables/util";
import store from "./store";
//全局前置守卫
let hasGetInfo = false;
//路径白名单
let authority=['/login','/signup']
router.beforeEach(async (to, from, next) => {
  //显示loading
  showFullloading();
  const token = getToken();
  //没有登录，强制调转
  if (!token && (!authority.includes(to.path))) {
    toast("你还没有登录", "error");
    return next({ path: "/login" });
  }
  //防止重复登录

  if (token && to.path == "/login") {
    toast("请不要重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }
  //如果用户登录了，自动获取信息，并存储在vuex种
  let hasNewRoutes = false;

  let title = (to.meta.title ? to.meta.title : "") + "-EngHub";
  document.title = title;

  hasNewRoutes ? next(to.fullPath) : next();
});
//全局后置守卫
router.afterEach((to, from) => hideFullloading()); // import router from "~/router"
// import { getToken } from "~/composables/auth"
// import {
//     toast,
//     showFullLoading,
//     hideFullLoading
// } from "~/composables/util"
// import store from "./store"

// // 全局前置守卫
// router.beforeEach(async (to,from,next)=>{
//     // 显示loading
//     showFullLoading()

//     const token = getToken()

//     // 没有登录，强制跳转回登录页
//     if(!token && to.path != "/login"){
//         toast("请先登录","error")
//         return next({ path:"/login" })
//     }

//     // 防止重复登录
//     if(token && to.path == "/login"){
//         toast("请勿重复登录","error")
//         return next({ path:from.path ? from.path : "/" })
//     }

//     // 如果用户登录了，自动获取用户信息，并存储在vuex当中
//     if(token){
//         await store.dispatch("getinfo")
//     }

//     // 设置页面标题
//     let title = (to.meta.title ? to.meta.title : "") + "-帝莎编程商城后台"
//     document.title = title

//     next()
// })

// // 全局后置守卫
// router.afterEach((to, from) => hideFullLoading())
