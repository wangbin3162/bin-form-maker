import { isLayouts } from '../config/component-list'

/* 根据配置list，获取所有field字段 */
export function getFieldsCfgByList(configList) {
  const fieldCfg = {
    fieldList: [],
    ctrlCfgs: {}, // 所有控件索引map
  }
  const mapper = node => {
    // 如果是可嵌套的布局
    if (node.type === 'grid') {
      node.columns.forEach(col => {
        col.list.forEach(gridNode => mapper(gridNode))
      })
    }
    if (node.type === 'group-container') {
      node.components.forEach(col => mapper(col))
    }
    if (node.type === 'tab-container') {
      node.tabs.forEach(tab => {
        tab.components.forEach(i => mapper(i))
      })
    }

    // 非布局组件，增加实际字段
    if (!isLayouts(node.type)) {
      fieldCfg.fieldList.push(node)
    }
    fieldCfg.ctrlCfgs[node.model] = node
  }

  configList.forEach(item => mapper(item))
  return fieldCfg
}
