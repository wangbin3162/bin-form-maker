import { createComponent } from '../config/component-cfg'
import { chunkArray } from './utils'

// 根据默认配置来处理必填项和追加定义
function formatFieldComp(item) {
  // 如果是实际字段，则根据字段的标识来创建一个字符串或者一个数字输入
  const type = item.fieldType === 'number' ? 'input-number' : 'input'
  const com = createComponent(type, item.fieldTitle, false)
  // 追加字段和定义
  com.label = item.fieldTitle
  com.model = item.fieldName
  com.config.maxlength = +item.fieldLength
  if (item.required) {
    // 如果有必填，则追加一个必填校验
    com.config.required = true
    com.rules = [
      {
        name: '$required',
        type: 'string',
        trigger: 'blur',
        message: '必填项',
      },
    ]
  }
  return com
}

/**
 * 获取默认布局（根据实际字段和默认列数)
 * @param {ref} widgetForm 实际保存的配置信息 ref类型  ref()
 * @param {[]} realFieldsDtos 实际字段的对象: { fieldName: '', fieldTitle: '', fieldLength: 10, fieldType: 'string|number', required: true },
 * @param {number} num  默认列数
 */
function setDefaultLayouts(widgetForm, realFieldsDtos, col = 4) {
  // 如果已经存在list配置
  if (widgetForm.value.list.length > 0 || realFieldsDtos.length === 0) return
  console.log(`-----------------设置默认[${col}]列布局------------------`)
  // 通栏布局，相当于每个属性字段点击一遍
  if (col === 1) {
    realFieldsDtos.forEach(item => {
      const com = formatFieldComp(item)
      widgetForm.value.list.push(com)
    })
    // 配置表单属性
    widgetForm.value.config.labelPosition = 'left'
    widgetForm.value.config.labelSuffix = ':'
  } else {
    // 超过两栏，这里需要分割数组，按照，个数分割好
    const list = chunkArray(realFieldsDtos, col)
    // 遍历列，增加grid组件
    list.forEach(row => {
      const grid = createComponent('grid', '', false)
      // 设置栅格属性
      const span = 24 / col
      grid.columns = []
      row.forEach(col => {
        grid.columns.push({ span, list: [formatFieldComp(col)] })
      })
      console.log(grid)
      widgetForm.value.list.push(grid)
    })
    // 配置表单属性
    widgetForm.value.config.labelPosition = 'top'
    widgetForm.value.config.labelSuffix = ''
  }
}

export { setDefaultLayouts }
