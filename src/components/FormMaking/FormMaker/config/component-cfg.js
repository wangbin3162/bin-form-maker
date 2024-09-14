import { deepMerge, generateId, uuid } from '../../core/utils/utils'
import { isLayouts } from '../../core/config/component-list'

const cfgs = import.meta.glob('../../FormGenerator/*/config.js', { eager: true })

const configMap = new Map()

// 制作基础组件映射
Object.keys(cfgs).forEach(key => {
  const config = cfgs[key].default
  // console.log(config)
  if (config?.type) {
    configMap.set(config.type, config)
  }
})

// 基础配置项
const BaseComponent = {
  rules: [],
}

// 根据组件类型（type==input) 创建新的配置项
function mergeConfig(type) {
  const config = configMap.get(type) || {}
  const baseObj = isLayouts(type) ? { type } : { type, ...BaseComponent }
  const mergeObj = deepMerge(baseObj, config)
  // 生成唯一key值，用于删除判定
  mergeObj.key = uuid()
  mergeObj.model = `${type}_${generateId()}`
  mergeObj.label = mergeObj.name
  // 每个组件都应该扩展一个隐藏属性
  mergeObj.config.hidden = false
  return mergeObj
}

/**
 * 创建组件
 * @param name
 */
export function createComponent(type) {
  const config = mergeConfig(type)
  console.log(`----------createComponent [${type}]: `, config)
  return config
}

// 基础数据类型
export const dataTypeMap = [
  { key: 'VARCHAR', value: '字符串' },
  { key: 'STRING', value: '文本' },
  { key: 'INTEGER', value: '整数' },
  { key: 'DECIMAL', value: '小数' },
  { key: 'DATE', value: '日期' },
  { key: 'DATETIME', value: '时间' },
]

// 初始化一个表单基础配置 // 入参是格式化后传入的内容
export function getNewFromCfg(widgetForm) {
  const opt = {
    list: [],
    config: {
      labelWidth: 100,
      labelPosition: 'top',
      labelSuffix: '',
      size: 'default',
      // 全局脚本监听
      globalEvents: [
        {
          fields: [], // 监听的字段及条件
          actions: [], // 满足执行的动作
          disActions: [], // 不满足执行的动作
        },
      ],
      globalDicts: [
        { key: 'xxx', name: '字典名', mapping: [{ key: '', value: '' }] },
        { key: 'xxx', name: '字典名', mapping: [{ key: '', value: '' }] },
      ], // 全局字典
    },
  }

  return deepMerge(opt, widgetForm)
}
