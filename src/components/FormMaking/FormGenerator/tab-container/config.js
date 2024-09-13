// 当前组件的组件专属属性
export default {
  type: 'tab-container',
  name: 'Tab容器',
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  tabs: [
    { key: 'Tab1', title: 'Tab1', components: [] },
    { key: 'Tab2', title: 'Tab2', components: [] },
  ],
  config: {
    defaultTab: 'Tab1',
    type: 'default', //'default','card','tag'
    padding: 8,
    margin: 8,
  },
}
