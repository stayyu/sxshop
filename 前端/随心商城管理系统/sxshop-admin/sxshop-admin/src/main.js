import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import api from './api/api'
import App from './App.vue'
import router from './router'
import { userAllDataStore } from './stores'

function isRoute(to){
  let res = router.getRoutes();
  let resFil = res.filter((item) => item.path === to.path);
  return resFil.length > 0;
}

router.beforeEach((to, from, next) => {
  const store = userAllDataStore();
  if (to.path !== "/login" && !store.state.token) {
    next({ name: "login" });
  } else if (!isRoute(to)) {
    next({ name: "404" });
  } else {
    next();
  }
});

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.provide("axios", axios);
app.config.globalProperties.$api = api;
const pinia = createPinia();
app.use(ElementPlus);
app.use(pinia);

const store = userAllDataStore();
store.addMenu(router, "refresh");

app.use(router).mount('#app');