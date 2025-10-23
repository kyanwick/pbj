import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Global auth guard: protect routes with meta.requiresAuth
  Router.beforeEach((to, from, next) => {
    // Only run on client
    if (typeof window === 'undefined') return next()

    const token = window.localStorage.getItem('auth_token')

    // If route requires auth and no token, redirect to login
    if (to.matched.some(record => record.meta && record.meta.requiresAuth)) {
      if (!token) {
        return next({ path: '/login', query: { redirect: to.fullPath } })
      }
    }

    // Optional: prevent logged-in users from seeing login/register
    if ((to.path === '/login' || to.path === '/register') && token) {
      return next('/lobby')
    }

    return next()
  })

  return Router
})
