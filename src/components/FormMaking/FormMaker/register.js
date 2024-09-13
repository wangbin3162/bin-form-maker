// 自动载入所有Formaker内，两层及的所有组件
const comps = import.meta.glob('./*/*/*.vue', { eager: true })

export function registerFormMaker(app) {
  Object.keys(comps).forEach(key => {
    const vueComp = comps[key].default
    // console.log(vueComp)
    // 注册组件
    app.component(vueComp.name, vueComp)
  })
}
