import { createComponent } from './core/config/component-cfg'

/**
 * （重要）根据默认配置来处理必填项和追加定义，
 * 这里因为不同的业务模块需要做不同的处理，
 * 因此这部分需要引用方进行默认的追加操作，比如string类型，希望可以转换为一个input控件，诸如此类的格式映射
 * @param {*} item
 * @returns
 */
export function formatFieldComp(item) {
  // 如果是实际字段，则根据字段的标识来创建一个字符串或者一个数字输入
  const typeMap = {
    string: 'input',
    number: 'input-number',
    date: 'date-picker',
  }
  const type = typeMap[item.fieldType]
  const com = createComponent(type, item.fieldTitle, false)
  // 追加字段和定义
  com.label = item.fieldTitle
  com.model = item.fieldName
  com.config.maxlength = item.fieldLength || 256
  if (item.required) {
    // 如果有必填，则追加一个必填校验
    com.config.required = true
    com.rules = [
      {
        name: '$required',
        type: 'string',
        trigger: 'blur',
        message: '必填项',
      },
    ]
  }
  return com
}
