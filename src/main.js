
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { router } from "./router";
import store from './store'
import 'virtual:svg-icons-register'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import permission from "~/directives/permission.js"
import './permission'
app.use(permission)
app.use(router);
app.use(ElementPlus);
app.use(store)
import 'virtual:windi.css'
app.mount('#app')