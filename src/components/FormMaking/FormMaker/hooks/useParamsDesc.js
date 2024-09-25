import useStoreCenter from '../../core/hooks/use-store-center'
// 参数配置
export function useParamsDesc() {
  const { realFieldWedgits, ctrlCfgs } = useStoreCenter()
  // 当前选中的表格控件字段列
  // 当前form表单模型
  const formModel = {}

  let modelStr = ''

  realFieldWedgits.value.forEach(item => {
    formModel[item.model] = null
    modelStr += `\n  ${item.model}: null, // ${item.name}`
  })

  const paramsDesc = [
    {
      name: 'formModel',
      desc: '当前表单的数据绑定对象。(可设置/获取表单字段值)',
      code: `const formModel = {${modelStr}\n}`,
    },
    {
      name: 'ctrlCfgs',
      desc: '所有表单控件配置信息。(可通过此设置控件显示隐藏等操作)',
      code: JSON.stringify(ctrlCfgs.value, null, 2),
      json: true,
    },
    {
      name: 'fetchData',
      desc: '自定义封装的接口请求函数(可根据需求进行调用，此函数通常是一个包装的axios函数)',
      code: `fetchData(config)`,
    },
    {
      name: 'util',
      desc: '自定义帮助函数，如深拷贝、日期转换等函数。',
      code: `console.log(util)`,
    },
  ]

  // 校验的示例代码编写
  const exampleDesc = [
    { name: '获取当前表单信息', code: 'console.log(formModel)' },
    { name: '获取当前控件配置信息', code: 'console.log(ctrlCfgs)' },
    { name: '获取util帮助函数', code: 'console.log(util)' },
    {
      name: 'fetchData 异步请求函数',
      code: `// 举例：验证重复
  try {
    const hasSame = await fetchData({
      url: '/checkNameExists',
      method: 'post',
      data: {
        id: formModel.id || '',
        name: formModel.name,
        type: 'aqgf'
      },
    })
    if(hasSame === 0) return true
  } catch (e) {
    console.log(e)
  }
  return false
  
  /**
   * 异步请求包装（会返回包装后的请求结果）
   * @param {*} config 请求对象包含method/url/data等
   * @param {*} result 请求成功判断值     // 默认 00
   * @param {*} dataKey 请求结果包装属性  // 默认 data
   * @param {*} msgKey 错误返回属性       //默认 message
   * @return Promise
   */
  async function fetchData(config, result, dataKey, msgKey){
  }`,
    },
    {
      name: '控件控制',
      code: `console.log(formModel, ctrlCfgs)\r\n// 如果编号为000的时候，隐藏后两个内容，禁用年龄控件\r\nif(formModel.fnumber === '000') {\r\n  ctrlCfgs.merit_pay.config.hidden = true\r\n  ctrlCfgs.year_month.config.hidden = true\r\n\r\n  ctrlCfgs.fage.config.disabled = true\r\n}`,
    },
  ]

  return {
    paramsDesc,
    exampleDesc,
  }
}
