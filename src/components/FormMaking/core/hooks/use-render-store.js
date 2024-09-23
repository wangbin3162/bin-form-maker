import { getNewFromCfg } from '../config/component-cfg'
import { ref, computed, toRaw } from 'vue'
import useRealFields from './use-real-fields'
import { buildRules } from '../utils/validator'
import { buildFun, isEmpty } from '../utils/utils'
import { createComponent } from '../../core/config/component-cfg'
import { chunkArray } from '../../core/utils/utils'

const renderStatus = {
  // 控件form对象配置信息
  widgetForm: ref({}),
  formModels: ref({}), // 实际存储的对象
  formRules: ref({}), // 实际form存储的校验
  slotsWedigets: ref([]), // 外部插槽的内容
}

/**
 * 渲染中信
 */
export default function useRenderStore() {
  const { widgetForm, formModels, formRules, slotsWedigets } = renderStatus

  const { realFieldWedgits, ctrlCfgs, treeList } = useRealFields(widgetForm)

  const formConfig = computed(() => widgetForm.value.config)

  // 初始化事件,第一个是表单对象的内容，第二个是自定义字段的列表,第三个是实际的字段对象
  function initSchema(form, customFields = [], realFieldsDtos = [], col = 4) {
    widgetForm.value = getNewFromCfg(form)
    if (widgetForm.value.list.length === 0) {
      console.log('-----------------默认四列布局------------------')
      getDefaultLayouts(col, realFieldsDtos)
    }
    // console.log(widgetForm.value)
    slotsWedigets.value = [...customFields]
    console.log('------------------- 初始化schema -------------------', widgetForm.value)
  }

  // 设置默认布局

  // 动态拼接model
  function generateModel() {
    // 实体字段进行初始化属性
    realFieldWedgits.value.forEach(item => {
      formModels.value[item.model.toLowerCase()] = item.config.defaultValue ?? null
    })
    console.log('----> 初始化 [models]: ', toRaw(formModels.value))
  }

  // 初始化校验数据
  function generateRules() {
    // 实体字段进行初始化属性
    realFieldWedgits.value.forEach(item => {
      if (item.rules) {
        if (item.rules.length > 0) {
          let rule = buildRules(item.rules, formModels.value, ctrlCfgs.value)
          formRules.value[item.model] = rule
        }
      }
    })
    console.log('----> 初始化 [rules]: ', toRaw(formRules.value))
  }

  // 填充默认字段，这时可能是树节点的，也可能是后续手动填充的字段
  function fillDefaultValue(defaultModel) {
    // 是否有默认对象用作数据回显
    const normalObj = defaultModel
    if (!isEmpty(normalObj)) {
      console.log('-------------------------------- 默认值设置 --------------------------------')
      if (normalObj && normalObj.id) formModels.value.id = normalObj.id

      console.log('----> 外部设置默认值 [defaultModel]: ', toRaw(normalObj))

      // 填充基本表单属性值
      realFieldWedgits.value.forEach(item => {
        const key = item.model.toLowerCase()
        // 判断是否有默认对象，如果有表示是修改时的回显数据填充
        if (normalObj && normalObj[key]) {
          formModels.value[key] = normalObj[key]
          // console.log('--->填充key: ' + key + ', value: ' + models.value[key])
        }
      })
    }
  }

  // 初始化表单必要的配置models和rulus
  function initForm(defaultModel) {
    formModels.value = {}
    formRules.value = {}
    generateModel()
    generateRules()
    fillDefaultValue(defaultModel)
    console.log('-------------------------------- 初始化完成 --------------------------------')
    console.log('----> 最终 [models]: ', toRaw(formModels.value))
    console.log('---------------------------------------------------------------------------')

    console.log(formConfig.value)
  }

  /**
   * 自定义函数
   */
  function customFun() {
    const customScript = formConfig.value.globalEvents.customScript
    const fun = buildFun(customScript.funcBody, customScript.arguments)
    fun(formModels.value, ctrlCfgs.value)
  }

  function customFunByStr(str) {
    const customScript = formConfig.value.globalEvents.customScript
    const fun = buildFun(str, customScript.arguments)
    fun(formModels.value, ctrlCfgs.value)
  }

  function formatFieldComp(item) {
    console.log(item)
    // 如果是实际字段，则根据字段的标识来创建一个字符串或者一个数字输入
    const type = item.fieldType === 'number' ? 'input-number' : 'input'
    const com = createComponent(type, item.fieldTitle, false)
    // 追加字段和定义
    com.label = item.fieldTitle
    com.model = item.fieldName
    com.config.maxlength = +item.fieldLength
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

  // 获取默认布局（根据实际字段和默认列数
  function getDefaultLayouts(num = 4, realFieldsDtos) {
    // 通栏布局，相当于每个属性字段点击一遍
    if (num === 1) {
      realFieldsDtos.forEach(item => {
        const com = formatFieldComp(item)
        widgetForm.value.list.push(com)
      })
      // 配置表单属性
      widgetForm.value.config.labelPosition = 'left'
      widgetForm.value.config.labelSuffix = ':'
    } else {
      // 超过两栏，这里需要分割数组，按照，个数分割好
      const list = chunkArray(realFieldsDtos, num)
      // 遍历列，增加grid组件
      list.forEach(row => {
        const grid = createComponent('grid', '', false)
        // 设置栅格属性
        const span = 24 / num
        grid.columns = []
        row.forEach(col => {
          grid.columns.push({ span, list: [formatFieldComp(col)] })
        })
        console.log(grid)
        widgetForm.value.list.push(grid)
      })
      // 配置表单属性
      widgetForm.value.config.labelPosition = 'top'
      widgetForm.value.config.labelSuffix = ''
    }
  }

  return {
    widgetForm,
    formConfig,
    // form
    formModels,
    formRules,
    // realfields status
    realFieldWedgits,
    ctrlCfgs,
    slotsWedigets,
    treeList,
    // func
    initSchema,
    initForm,
    customFun,
    customFunByStr,
  }
}
