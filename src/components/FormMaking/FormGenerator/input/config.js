// 当前组件的组件专属属性
export default {
  type: 'input',
  name: '单行文本', // 控件名称，创建时默认扩展一个label属性用于form-label显示文字。选择字段标识时可带入
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  config: {
    // 上方是扩展字段
    required: false,
    tooltip: '', // 提示
    defaultValue: '', // 默认值
    // 下方是控件自身的属性
    type: 'text', // 可以是password等
    placeholder: '请输入',
    maxlength: 256,
    clearable: true,
    // 控制类属性
    disabled: false,
    hidden: false,
  },
}
