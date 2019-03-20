// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//import $ from 'webpack-zepto';
import $ from 'jquery';
// 重置默认样式
import "normalize.css/normalize.css"
import "./style/index.scss"

import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
Vue.use(MintUI)

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import {$axios} from "./util/index"
Vue.prototype.$axios = $axios

Vue.prototype.$url = "http://39.96.39.111:6022"
// Vue.prototype.$url = "http://192.168.4.11:8484"

import store from './store'

import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
Vue.use(Share)

import dateTime from 'vue-date-time-m';
Vue.component('data-time', dateTime);

// 表单验证
import VeeValidate from "vee-validate";
import VueI18n from "vue-i18n";
import zh_CN from "vee-validate/dist/locale/zh_CN";

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "zh_CN"
});
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: "validation",
  dictionary: {
    zh_CN
  }
});
// 侧边划出插件
import DrawerLayout from 'vue-drawer-layout'
Vue.use(DrawerLayout)
import router from './router'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
