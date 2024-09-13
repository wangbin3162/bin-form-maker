/* 根据配置list，获取所有field字段 */
export function getFieldsCfgByList(configList) {
  const fieldCfg = {
    fieldList: [],
    subList: [],
    readList: [],
    subTableList: [],
    readNodeList: [],
  }
  const mapper = node => {
    // 如果是可嵌套的布局
    if (node.model === 'no-model' || node.type === 'sub-table' || node.type === 'readlist') {
      if (node.type === 'sub-table') {
        const key = node.model
        fieldCfg.subList.push({
          ...node,
          model: key,
        })
        node.options.relationConfig.layout = deepCopy(node.options.columnsConfig)
        fieldCfg.readNodeList.push({
          ...node.options.relationConfig,
        })
      }
      if (node.type === 'readlist') {
        const key = node.model
        fieldCfg.readList.push({
          ...node,
          model: key,
        })
      }
      if (node.type === 'grid') {
        node.columns.forEach(col => {
          col.list.forEach(gridNode => {
            mapper(gridNode)
          })
        })
      }
      if (node.type === 'group-container') {
        node.components.forEach(col => {
          mapper(col)
        })
      }
      if (node.type === 'tab-container') {
        node.tabs.forEach(tab => {
          tab.components.forEach(gridNode => {
            mapper(gridNode)
          })
        })
      }
      if (node.type === 'step-container') {
        node.steps.forEach(step => {
          step.components.forEach(gridNode => {
            mapper(gridNode)
          })
        })
      }
    } else {
      fieldCfg.fieldList.push(node)
    }
  }

  configList.forEach(item => mapper(item))
  return fieldCfg
}
