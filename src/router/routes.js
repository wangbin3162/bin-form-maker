import layout from '@/App.vue'
import menus, { HOME_PATH } from './menus'

/**
 * @description 创建在 layout 中显示的路由设置
 * @param {Array} routes 动态路由设置
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: { name: HOME_PATH },
    name: 'Root',
    component: layout,
    children: menus.map(i => ({
      path: i.name,
      name: i.name,
      meta: { title: i.title },
      component: i.component,
    })),
  },
]
