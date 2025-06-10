import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'; // 导入 Vuex store

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  router,
  store, // 挂载 Vuex store
  render: h => h(App)
}).$mount('#app');