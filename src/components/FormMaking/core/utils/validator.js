import { isEmpty } from './utils'
import { isIdCard, isUnifiedCode, isDate } from './validate'
/**
 * 触发条件枚举
 */
export const TRIGGER = ['blur', 'change']

/**
 * 触发条件枚举
 */
export const TYPE = ['string', 'number', 'object']

/**
 * 静态校验
 */
export const SIMPLE_RULE = {
  length: '$length',
  email: '$email',
  phone: '$phone',
  idCode: '$idCode',
  unifiedCode: '$unifiedCode',
  regexp: '$regexp',
}
/**
 * 可多次添加的特殊校验名称
 */
export const MULTIPLE_RULE = {
  conditionRequired: '$conditionRequired',
  conditionNotRequired: '$conditionNotRequired',
  conditionNotBe: '$conditionNotBe',
  notSame: '$notSame',
  timeBound: '$timeBound',
  customFun: '$customFun',
}

/**
 * 类型验证
 */
export const TYPE_RULE = {
  integer: '$integer',
  decimal: '$decimal',
  letter: '$letter',
  chinese: '$chinese',
  alphanumeric: '$alphanumeric',
  date: '$date',
  dateTime: '$dateTime',
}

/**
 * 校验枚举值，全部
 */
export const RULE = {
  required: '$required',
  ...SIMPLE_RULE,
  ...TYPE_RULE,
  ...MULTIPLE_RULE,
}

/**
 * 校验枚举值名称
 */
export const RULE_NAME_MAP = {
  $required: '必填项',
  $uniqued: '唯一性',
  $length: '长度参数',
  $email: '邮箱参数',
  $phone: '手机号码',
  $regexp: '自定义', //'正则匹配'
  $idCode: '身份证',
  $unifiedCode: '纳税人识别号', //'统一社会信用代码',
  $conditionRequired: '条件必填',
  $conditionNotRequired: '条件必不填',
  $conditionNotBe: '条件不为某值',
  $notSame: '值不能相同',
  $timeBound: '日期区间',
  $integer: '整数参数',
  $decimal: '小数参数',
  $letter: '字母参数',
  $chinese: '汉字参数',
  $alphanumeric: '数字字母',
  $date: '日期参数',
  $dateTime: '时间参数',
  $customFun: '脚本函数',
}

/**
 * 校验生成器对象根据不同类型的校验返回符合form-item类型的校验对象
 */
export const validatorBuild = {
  // 必填字段 opts: { message,trigger,type}
  $required: function (opts) {
    return { required: true, message: opts.message, trigger: opts.trigger }
  },
  // 长度 opts: { min,max,message,trigger,type }
  $length: function (opts) {
    return {
      min: opts.min,
      max: opts.max,
      message: opts.message,
      trigger: opts.trigger,
      type: opts.type,
    }
  },
  // 邮箱 opts: { message,trigger }
  $email: function (opts) {
    return { type: 'email', message: opts.message, trigger: opts.trigger }
  },
  // 手机号 opts: { message,trigger }
  $phone: function (opts) {
    return {
      pattern: /^((0\d{2,3}-\d{7,8})|(1[35874]\d{9}))$/,
      message: opts.message,
      trigger: opts.trigger,
    }
  },
  // 整数
  $integer: function (opts) {
    return {
      pattern: /^[+]{0,1}(\d+)$/,
      message: opts.message,
      trigger: opts.trigger,
    }
  },
  //小数
  $decimal: function (opts) {
    return {
      pattern: /^[0-9]+(.[0-9]+)?$/,
      message: opts.message,
      trigger: opts.trigger,
    }
  },
  //字母
  $letter: function (opts) {
    return {
      pattern: /^[A-Za-z]+$/,
      message: opts.message,
      trigger: opts.trigger,
    }
  },
  //汉字
  $chinese: function (opts) {
    return {
      pattern: /^[\u4e00-\u9fa5]+$/,
      message: opts.message,
      trigger: opts.trigger,
    }
  },
  //数字字母
  $alphanumeric: function (opts) {
    return {
      pattern: /^[A-Za-z0-9]+$/,
      message: opts.message,
      trigger: opts.trigger,
    }
  },
  //日期
  $date: function (opts) {
    return {
      pattern:
        /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
      message: opts.message,
      trigger: opts.trigger,
    }
  },
  //日期时间
  $dateTime: function (opts) {
    return {
      pattern:
        /^([0-2][0-9]{3})\-(0[1-9]|1[0-2])\-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):([0-5][0-9])\:([0-5][0-9])(([\-\+]([0-1][0-9])\:00))?$/,
      message: opts.message,
      trigger: opts.trigger,
    }
  },
  // 正则表达式  opts: { regexp,message,trigger }
  $regexp: function (opts) {
    return { pattern: new RegExp(opts.regexp), message: opts.message, trigger: opts.trigger }
  },
  /* =========[信息项规则]=============== */
  // 居民身份证号码 opts: { preField,ignoreCase,message,trigger }
  $idCode: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const caseValue = opts.ignoreCase ? String(value).toUpperCase() : value
        const result = isEmpty(value) || isIdCard(caseValue)
        if (!result) callback(new Error(opts.message))
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 统一社会信用代码 opts: { preField,ignoreCase,message,trigger }
  $unifiedCode: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        // 需判是否需要级联判断id_type，统一社会信用代码为L1，工商注册号代码为L2，组织机构代码为L3
        const caseValue = opts.ignoreCase ? String(value).toUpperCase() : value
        const result = isEmpty(value) || value === '00000000000000000X' || isUnifiedCode(caseValue)
        if (!result) callback(new Error(opts.message))
        // console.log('$unifiedCode', result)
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 条件必填 opts: { preField, preFieldValue,message,trigger} obj:form
  $conditionRequired: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField] // 前置字段当前值
        const preFieldValue = opts.preFieldValue // 前置字段需要匹配的值
        // console.log(preField, preFieldValue)
        if (
          (isEmpty(preField) && isEmpty(preFieldValue)) ||
          preField === preFieldValue ||
          (isEmpty(preFieldValue) && String(preField) === preFieldValue) ||
          (!isEmpty(preFieldValue) && String(preField).includes(preFieldValue))
        ) {
          if (isEmpty(value)) callback(new Error(opts.message))
        }
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 条件必不填 opts: { preField, preFieldValue,message,trigger} obj:form
  $conditionNotRequired: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField] // 前置字段当前值
        const preFieldValue = opts.preFieldValue // 前置字段需要匹配的值
        // console.log(opts.preField + ':' + preField)
        // console.log((String(preField) === preFieldValue), (String(preField).includes(preFieldValue)))
        if (
          (isEmpty(preField) && isEmpty(preFieldValue)) ||
          preField === preFieldValue ||
          (isEmpty(preFieldValue) && String(preField) === preFieldValue) ||
          (!isEmpty(preFieldValue) && String(preField).includes(preFieldValue))
        ) {
          if (!isEmpty(value)) callback(new Error(opts.message))
        }
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 条件不能为某值 opts: { preField, preFieldValue,notValue,message,trigger} obj:form
  $conditionNotBe: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField] // 前置字段当前值
        const preFieldValue = opts.preFieldValue // 前置字段需要匹配的值
        if (
          preField === preFieldValue ||
          (isEmpty(preFieldValue) && String(preField) === preFieldValue) ||
          (!isEmpty(preFieldValue) && String(preField).includes(preFieldValue))
        ) {
          if (value === opts.notValue || String(value) === opts.notValue) {
            callback(new Error(opts.message))
          }
        }
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 值不能相同 opts: { preField,message,trigger} obj:form
  $notSame: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        const preField = obj[opts.preField] // 前置字段当前值
        if ((preField && String(preField) === value) || preField === value) {
          callback(new Error(opts.message))
        }
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 日期区间验证 opts: { time, compareMode:{gt,ge,lt,le} ,message , trigger} obj:form
  $timeBound: function (opts, obj) {
    if (!obj) {
      return null
    }
    return {
      validator: (rule, value, callback) => {
        if (isEmpty(value)) {
          callback()
          return
        }
        // 计算实际时间 // 获取实际时间，$now 当前时间，or 2099-01-01 or preField前置字段
        let otherTime
        if (opts.time === '$now') {
          otherTime = new Date()
          // console.log('time is $now')
        } else {
          if (isDate(opts.time)) {
            // 转换2020-01-01 中划线，转换date时取东八区8点补全
            otherTime = new Date(opts.time.replace(/-/g, '/'))
            // console.log(otherTime)
            // console.log('time is date string')
          } else {
            const preField = obj[opts.time] // 前置字段当前值
            otherTime = isDate(preField) ? new Date(preField.replace(/-/g, '/')) : null
            // console.log('time is field[' + opts.time + ']:' + preField)
          }
        }
        const mode = opts.compareMode // 比较模式
        const thisTime = new Date(value.replace(/-/g, '/'))
        let result = true // 校验结果
        if (otherTime) {
          switch (mode) {
            case 'gt':
              result = thisTime > otherTime
              break
            case 'ge':
              result = thisTime >= otherTime
              break
            case 'lt':
              result = thisTime < otherTime
              break
            case 'le':
              result = thisTime <= otherTime
              break
          }
        }
        if (!result) callback(new Error(opts.message))
        callback()
      },
      trigger: opts.trigger,
    }
  },
  // 脚本函数, 需要传入编辑对象，和所有控件的配置项
  $customFun: function (opts, obj, ctrlCfgs) {
    const AsyncFunction = async function () {}.constructor
    const fun = new AsyncFunction(...opts.augments, opts.funcBody)
    return {
      validator: async (rule, value, callback) => {
        try {
          const res = await fun(obj, ctrlCfgs)
          if (res) {
            callback()
          } else {
            callback(new Error(opts.message))
          }
        } catch (error) {
          console.error(error)
        }
      },
      trigger: opts.trigger,
    }
  },
}

/**
 * 根据rules获取实际form-item需要的rules
 * @param rules
 * @param formModel : sourceObj 就是 formModel
 */
export function buildRules(rules, formModel, ctrlCfgs) {
  return rules.map(rule => {
    return validatorBuild[rule.name](rule, formModel, ctrlCfgs)
  })
}
