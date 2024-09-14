// 当前组件的组件专属属性
export default {
  type: 'radio',
  name: '单选框组',
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  config: {
    // 上方是扩展字段
    required: false,
    tooltip: '', // 提示
    defaultValue: '', // 默认值
    // 下方是控件自身的属性
    type: 'default', // 可以是password等
    width: 'auto',
    source: {
      type: 'static', // static,dynamic
      confCode: '', // 动态字典编码
      confName: '', // 动态字典名称
    },
    options: [
      { key: 'option1', label: '选项1' },
      { key: 'option2', label: '选项2' },
      { key: 'option3', label: '选项3' },
    ],
    // 控制类属性
    hidden: false,
    disabled: false,
  },
}
