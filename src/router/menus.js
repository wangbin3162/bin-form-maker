export const HOME_PATH = 'WorkBench'
export const HOME_NAME = '工作台'
export default [
  {
    name: HOME_PATH,
    title: HOME_NAME,
    component: () => import('@/views/home.vue'),
  },
]
