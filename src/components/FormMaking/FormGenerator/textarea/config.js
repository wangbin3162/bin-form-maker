// 当前组件的组件专属属性
export default {
  type: 'textarea',
  name: '文本域',
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  config: {
    // 上方是扩展字段
    required: false,
    tooltip: '', // 提示
    defaultValue: '', // 默认值
    placeholder: '请输入',
    maxlength: 256,
    rows: 2, // 默认行数
    noResize: false, // 是否可拖动
    showWordCount: true,
    // 控制类属性
    hidden: false,
    disabled: false,
  },
}
