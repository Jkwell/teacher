// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueLazyload from 'vue-lazyload'
import './common/reset.css'
import { ToastPlugin, LoadingPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueLazyload, {
  loading: require('@/common/image/teacher/courseImg.jpg'),
  error: require('@/common/image/teacher/courseImg.jpg')
})
Vue.config.productionTip = false
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.requireAuth) {
    if (localStorage.getItem('loginStatus')) {
      next()
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }
    }
  } else {
    next()
  }
  if (to.fullPath === '/login') {
    if (localStorage.getItem('loginStatus')) {
      next({
        path: from.fullPath
      })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
