// 当前组件的组件专属属性
export default {
  type: 'divider',
  name: '分割线',
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  config: {
    align: 'left',
    margin: '24px 0',
    dashed: false,
    type: 'horizontal', //"vertical"
  },
}
