import useRealFields from '../../../core/hooks/use-real-fields'
import useStoreCenter from '../../hooks/store-center'
export function useParamsDesc() {
  const { widgetForm } = useStoreCenter()
  // 当前选中的表格控件字段列
  // 当前form表单模型
  const formModel = {}

  let modelStr = ''
  const { realFieldWedgits, ctrlCfgs } = useRealFields(widgetForm)

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
  ]

  // 校验的示例代码编写
  const exampleDesc = [
    { name: '获取当前表单信息', code: 'console.log(formModel)' },
    { name: '获取当前控件配置信息', code: 'console.log(ctrlCfgs)' },
  ]

  return {
    paramsDesc,
    exampleDesc,
  }
}
