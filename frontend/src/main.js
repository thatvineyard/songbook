import Vue from 'vue';
import VueRouter from 'vue-router';
// import ElementUI, { Button, Select } from 'element-ui';
import App from './App.vue';
// import Edit from './Edit.vue';
import SongCard from './components/SongCard.vue';

Vue.config.productionTip = false;
Vue.prototype.$rootApi = process.env.VUE_APP_ROOT_API;

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

// Vue.use(ElementUI);
// Vue.use(Button);
// Vue.use(Select);

// 2. Define route components
const Home = App;
// const Edit = Edit;

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/edit/:id', component: SongCard, props: { songId: 'song-0' } },
  ],
});

new Vue({
  router,
  template: `
      <router-view class="view"></router-view>
  `,
}).$mount('#app');
