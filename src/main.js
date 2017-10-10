// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';
import filters from '@/filters';
import App from '@/components/App';
import router from '@/router';
import storeConfig from '@/store';
import urls from 'urls'; // eslint-disable-line
import '@/serviceWorker/index';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueCookie);

const store = new Vuex.Store(storeConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  filters,
  template: '<App/>',
  components: { App },
});
