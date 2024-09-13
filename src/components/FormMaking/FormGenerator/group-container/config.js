// 当前组件的组件专属属性
export default {
  type: 'group-container',
  name: '分组容器',
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  components: [],
  config: {
    title: {
      text: '分组标题',
      fontSize: 16,
      icon: 'menu',
    },
    collapse: true,
    shadow: 'shadow',
    padding: 8,
    margin: 8,
  },
}
