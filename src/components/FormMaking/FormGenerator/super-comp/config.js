import { defaultSfcCode } from '../../core/config/normal-sfc-demo'

// 超级组件
export default {
  type: 'super-comp',
  name: '超级组件', // 控件名称，创建时默认扩展一个label属性用于form-label显示文字。选择字段标识时可带入
  model: '', // 用于存储当前字段的字段名称，fieldName,可以生成字段
  config: {
    // 上方是扩展字段
    required: false,
    tooltip: '', // 提示
    defaultValue: '', // 默认值
    // 下方是控件自身的属性
    type: 'code', // code/url
    currentCode: defaultSfcCode,
    currentUrl: '/remote-components/sample.vue',
    // 动态入参
    dynmicProps: JSON.stringify({}),
    // 控制类属性
    hidden: false,
  },
}
