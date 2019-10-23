import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
Vue.use(utils)
Vue.config.productionTip = false

// Vue.component('mc-container', McContainer)
const components = require.context('./components', false, /\.vue$/)
components.keys().forEach(key => {
  const name = key.match(/\.\/(.+?)\.vue/)[1]
  console.log(name)
  Vue.component(name, components(key).default)
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
