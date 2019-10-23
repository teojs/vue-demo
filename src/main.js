import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
Vue.use(utils)
Vue.config.productionTip = false

// 自动注册全局组件
const components = require.context('./components', false, /\.vue$/)
components.keys().forEach(key => {
  Vue.component(key.match(/\.\/(.+?)\.vue/)[1], components(key).default)
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
