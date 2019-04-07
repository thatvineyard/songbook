import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$rootApi = process.env.VUE_APP_ROOT_API;

new Vue({
  render: h => h(App),
}).$mount('#app');
