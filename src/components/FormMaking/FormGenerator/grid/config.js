// 当前组件的组件专属属性
export default {
  type: 'grid',
  name: '栅格布局',
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  columns: [
    {
      span: 12,
      list: [],
    },
    {
      span: 12,
      list: [],
    },
  ],
  config: {
    gutter: 16,
    justify: 'start',
    align: 'top',
  },
}
