// 变量示例
// const paramsDesc = [
//   {
//     name: 'formModel',
//     desc: '当前表单的数据绑定对象。(可设置/获取表单字段值)',
//     code: `const formModel = {${modelStr}\n}`,
//   },
//   {
//     name: 'ctrlCfgs',
//     desc: '所有表单控件配置信息。(可通过此设置控件显示隐藏等操作)',
//     code: JSON.stringify(ctrlCfgs, null, 2),
//     json: true, // 表示是json模式展示
//   },
// ]

// 脚本示例
// const exampleDesc = [
//   { name: '获取当前表单信息', code: 'console.log(formModel)' },
//   { name: '获取当前控件配置信息', code: 'console.log(ctrlCfgs)' },
// ]

// 生成运行时可调用的函数，附加通用参数。
export function buildFun(funcBody, ...augments) {
  const paramsStr = new Set([...augments])
  const AsyncFunction = async function () {}.constructor
  const fun = new AsyncFunction(...paramsStr, funcBody)
  return async (...params) => {
    return await fun(...params)
  }
}
