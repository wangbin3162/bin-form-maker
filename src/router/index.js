import { createRouter, createWebHashHistory } from 'vue-router'
import { LoadingBar } from 'bin-ui-design'
import { scrollBehavior } from './scrollBehavior'
import { constantRoutes } from './routes'

/**
 * @description 创建路由
 * @param {Array} routes 路由设置
 */
const initRouter = (routes = []) =>
  createRouter({
    history: createWebHashHistory(),
    scrollBehavior,
    routes,
  })

const router = initRouter(constantRoutes)

/**
 * @description 新增动态route
 * @param {Array} routes 额外追加的路由
 */
export function resetRoutes(routes = []) {
  routes.forEach(route => {
    router.addRoute('Root', route)
  })
}

// config router
export function setupRouter(app) {
  app.use(router)
}

router.beforeEach(() => {
  LoadingBar.start()
})
router.afterEach(() => {
  LoadingBar.done()
})

export default router
