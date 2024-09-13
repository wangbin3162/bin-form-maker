// 当前组件的组件专属属性
export default {
  type: 'date-picker',
  name: '日期选择器',
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  config: {
    // 上方是扩展字段
    required: false,
    tooltip: '', // 提示
    defaultValue: '', // 默认值
    // 下方是控件自身的属性
    type: 'date',
    placeholder: '请选择',
    format: 'YYYY-MM-DD',
    editable: true,
    clearable: true,
    // 控制类属性
    readonly: false,
    hidden: false,
    disabled: false,
  },
}
