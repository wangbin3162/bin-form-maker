const cfgs = import.meta.glob('./config/*.vue', { eager: true })

export function registerFormMaker(app) {
  Object.keys(cfgs).forEach(key => {
    const vueComp = cfgs[key].default
    // console.log(vueComp)
    // 为了放置重名，这里增加一个前缀
    // 注册组件
    app.component(`BF${vueComp.name}`, vueComp)
  })
}
