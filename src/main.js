// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import highcharts from 'highcharts'
import VueHighCharts from 'vue2-highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
import global from './ipconfig/globleApi';
Vue.prototype.global = global;
Vue.use(VueHighCharts)
highcharts3d(highcharts)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
/**
 * 引入element
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// main.js
import 'lib-flexible'

/**
 * 引入cesium
 */
import Cesium from 'cesium/Cesium'
import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'
Vue.prototype.Cesium = Cesium
/**
 * 引入vuex
 */
import Vuex from 'vuex'
Vue.use(Vuex)
/**
 * 引入axios
 */
import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
