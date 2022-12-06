import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
// import VueCookies from 'vue3-cookies';
import { loadFonts } from './plugins/webfontloader';
import store from './store';

loadFonts();

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  // .use(VueCookies, {
  //   expireTimes: '2d',
  //   path: '/',
  // })
  .mount('#app');
