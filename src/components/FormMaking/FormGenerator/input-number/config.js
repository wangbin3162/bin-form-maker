// 当前组件的组件专属属性
export default {
  type: 'input-number',
  name: '计数器',
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  config: {
    // 上方是扩展字段
    required: false,
    tooltip: '', // 提示
    defaultValue: null, // 默认值
    width: '100%',
    btnPos: 'right', // always 两侧
    // 下方是控件自身的属性
    min: 0,
    max: null,
    step: 1,
    precision: 0,
    arrowUpIcon: 'plus',
    arrowDownIcon: 'minus',
    editable: true,
    // 控制类属性
    readonly: false,
    hidden: false,
    disabled: false,
  },
}
