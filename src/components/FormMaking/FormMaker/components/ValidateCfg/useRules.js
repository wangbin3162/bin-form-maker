import { computed, ref, watch } from 'vue'
import { MULTIPLE_RULE, RULE, TYPE, TRIGGER } from '../../../core/utils/validator'
import { deepCopy } from '@/components/FormMaking/core/utils/utils'

export function useRules(data) {
  const checkRules = ref(deepCopy(data.value.rules))

  const normalType = computed(() => (data.value.type === 'input-number' ? TYPE[1] : TYPE[0]))

  const normalTrigger = computed(() =>
    ['input', 'textarea'].includes(data.value.type) ? TRIGGER[0] : TRIGGER[1],
  )

  // 必填change事件
  function requiredChange(val) {
    if (val) {
      setRules(RULE.required)
    } else {
      const index = checkRules.value.findIndex(item => item.name === RULE.required)
      if (index > -1) {
        removeRules(index)
      }
    }
  }

  // 增加校验，即增加默认参数配置
  function setRules(ruleType) {
    const normalCfg = name => ({
      name,
      type: normalType.value,
      trigger: normalTrigger.value,
    })

    // 根据不同的校验名增加不同的校验对象
    switch (ruleType) {
      case RULE.required:
        checkRules.value.unshift({
          ...normalCfg(ruleType),
          message: '必填项',
        })
        break
      case RULE.length:
        checkRules.value.push({
          ...normalCfg(ruleType),
          min: 1,
          max: 256,
          message: '长度必须在指定的范围内',
        })
        break
      case RULE.email:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '邮箱格式不正确',
        })
        break
      case RULE.phone:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '手机号格式不正确',
        })
        break
      case RULE.integer:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '整数格式不正确',
        })
        break
      case RULE.decimal:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '小数格式不正确',
        })
        break
      case RULE.letter:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '字母格式不正确',
        })
        break
      case RULE.chinese:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '汉字格式不正确',
        })
        break
      case RULE.alphanumeric:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '数字字母格式不正确',
        })
        break
      case RULE.date:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '日期格式不正确',
        })
        break
      case RULE.dateTime:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '日期时间格式不正确',
        })
        break
      case RULE.idCode:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '身份证格式不正确',
          ignoreCase: true,
        })
        break
      case RULE.unifiedCode:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '统一社会信用代码格式不正确',
          ignoreCase: true,
        })
        break
      case RULE.regexp:
        checkRules.value.push({
          ...normalCfg(ruleType),
          regexp: '',
          message: '正则表达式不匹配',
        })
        break
      case RULE.conditionRequired:
        checkRules.value.push({
          ...normalCfg(ruleType),
          preField: '',
          preFieldValue: '',
          message: '当前字段在前置字段条件达成下必填',
        })
        break
      case RULE.conditionNotRequired:
        checkRules.value.push({
          ...normalCfg(ruleType),
          preField: '',
          preFieldValue: '',
          message: '当前字段在前置字段条件达成下不可填写',
        })
        break
      case RULE.conditionNotBe:
        checkRules.value.push({
          ...normalCfg(ruleType),
          preField: '',
          preFieldValue: '',
          notValue: '',
          message: '当前字段在前置字段条件达成下不能为某值',
        })
        break
      case RULE.notSame:
        checkRules.value.push({
          ...normalCfg(ruleType),
          preField: '',
          message: '不能和前置字段值相同',
        })
        break
      case RULE.timeBound:
        checkRules.value.push({
          ...normalCfg(ruleType),
          time: '$now',
          compareMode: 'gt',
          message: '日期不符合区间设置',
        })
        break
      case RULE.customFun:
        checkRules.value.push({
          ...normalCfg(ruleType),
          message: '校验失败',
          funcBody: '',
          arguments: ['formModel', 'ctrlCfgs'],
        })
        break
      default:
        break
    }
  }

  // 移除某个类型的校验
  function removeRules(index) {
    const currentRule = checkRules.value[index]
    if (currentRule.name === '$required') {
      data.value.config.required = false
    }
    checkRules.value.splice(index, 1)
  }

  // rulesClass样式
  function rulesClass(name) {
    if (name === RULE.required) {
      return 'is-required'
    } else if (MULTIPLE_RULE[name.slice(1)]) {
      return 'is-multiple'
    } else {
      return 'is-normal'
    }
  }

  // 是否有相同名称的校验项
  function hasSameRule(name) {
    if (MULTIPLE_RULE[name]) {
      return false
    } else {
      return checkRules.value.findIndex(item => item.name === name) > -1
    }
  }

  watch(
    () => checkRules.value,
    () => {
      data.value.rules = deepCopy(checkRules.value)
    },
    { deep: true },
  )

  return {
    checkRules,
    requiredChange,
    setRules,
    removeRules,
    rulesClass,
    hasSameRule,
  }
}
