const cfgs = import.meta.glob('./config/*.vue', { eager: true })

export function registerFormMaker(app) {
  Object.keys(cfgs).forEach(key => {
    const vueComp = cfgs[key].default
    // console.log(vueComp)
    // 注册组件
    app.component(`BF${vueComp.name}`, vueComp)
  })
}
