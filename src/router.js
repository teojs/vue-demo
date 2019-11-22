import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const routers = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    // 异步
    {
      path: '/asyn',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "asyn" */ './views/Home.vue'),
    },
  ],
})

routers.beforeEach((to, from, next) => {
  document.title = to.meta.title || ''
  next()
})

export default routers
