import { isLayouts, layoutComponents } from '../config/component-list'

/* 根据配置list，获取所有field字段 */
export function getFieldsCfgByList(configList) {
  const fieldCfg = {
    fieldList: [], // 所有实际存储的字段列表
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

/* 根据配置list，获得树结构大纲 */
export function getTreeList(configList) {
  const mapper = node => {
    const mapperNode = {
      key: node.key,
      title: node.label,
      icon: layoutComponents.find(i => i.type === node.type)?.icon || '',
      type: node.type,
      model: node.model,
      // data: node,
    }
    // 如果是可嵌套的布局
    if (node.type === 'grid') {
      mapperNode.children = []
      node.columns.forEach((col, index) => {
        const colNode = {
          key: `col_${mapperNode.key}_${index + 1}`,
          title: `栅格_${index + 1}`,
          icon: 'insertrowbelow',
          type: 'col',
        }
        colNode.children = col.list.map(mapper)
        mapperNode.children.push(colNode)
      })
    }
    if (node.type === 'group-container') {
      mapperNode.children = node.components.map(mapper)
    }
    if (node.type === 'tab-container') {
      mapperNode.children = []
      node.tabs.forEach((tab, index) => {
        const tabNode = {
          key: `tab_${mapperNode.key}_${index + 1}`,
          title: `标签_${index + 1}`,
          icon: 'tag',
          type: 'tag',
        }
        tabNode.children = tab.components.map(mapper)
        mapperNode.children.push(tabNode)
      })
    }

    return mapperNode
  }

  return configList.map(mapper)
}
