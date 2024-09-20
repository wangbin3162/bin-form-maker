export const COMPARE = {
  IN: '包含',
  NOTIN: '不包含',
  EQ: '等于',
  NE: '不等于',
}

export const COMPARE_NUM = {
  EQ: '等于',
  NE: '不等于',
  GT: '大于',
  LT: '小于',
  GTE: '大于等于',
  LTE: '小于等于',
}

export const COMPARE_STR = {
  IN: 'includes',
  NOTIN: 'includes',
  EQ: '===',
  NE: '!==',
  GT: '>',
  LT: '<',
  GTE: '>=',
  LTE: '<=',
}

export const OTYPE = {
  show: '显示',
  hidden: '隐藏',
  enabled: '启用',
  disabled: '禁用',
}

// 动作文字
export const OTYPE_STR = {
  show: 'hidden = false',
  hidden: 'hidden = true',
  enabled: 'disabled = false',
  disabled: 'disabled = true',
}

export function buildCompareStr(eventList) {
  const strList = [] // 定义行字符串拼接数组
  const enter = '\r\n'
  const tab = '  '
  const model = 'formModel'
  const ctrls = 'ctrlCfgs'

  eventList.forEach(element => {
    const { fields, actions, disActions } = element
    let ops = ''
    // 1.根据字段拼接条件
    fields.forEach((f, index) => {
      const vl = f.type === 'input-number' ? f.value : `'${f.value}'`

      let op = ''
      if (f.compare === 'IN') op = `.${COMPARE_STR[f.compare]}(${vl})`
      else if (f.compare === 'NOTIN') op = `.${COMPARE_STR[f.compare]}(${vl}) === false`
      else op = ` ${COMPARE_STR[f.compare]} ${vl}`

      if (index === 0) {
        ops += `${model}.${f.fieldName}${op}`
      } else {
        ops += ` && ${model}.${f.fieldName}${op}`
      }
    })
    strList.push(`if(${ops}) {${enter}`)

    // 2.拼接满足条件匹配
    actions.forEach(f => {
      strList.push(`${tab} ${ctrls}.${f.fieldName}.config.${OTYPE_STR[f.oType]} ${enter}`)
    })

    strList.push(`} else {${enter}`)

    // 3.拼接不满足条件匹配
    disActions.forEach(f => {
      strList.push(`${tab} ${ctrls}.${f.fieldName}.config.${OTYPE_STR[f.oType]} ${enter}`)
    })

    strList.push(`} ${enter}`)
  })
  return strList.join('')
}
