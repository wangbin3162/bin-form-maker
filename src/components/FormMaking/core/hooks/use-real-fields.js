import { computed } from 'vue'
import { getFieldsCfgByList, getTreeList } from './getRealFields'
/**
 * 获取真实的字段/控件列表
 * @param {控件对象} widgetForm Ref
 * @returns
 */
export default function useRealFields(widgetForm) {
  const fieldCfg = computed(() => getFieldsCfgByList(widgetForm.value.list))

  const treeList = computed(() => getTreeList(widgetForm.value.list))

  // 所有实际存储字段
  const realFieldWedgits = computed(() => fieldCfg.value.fieldList)
  // 所有控件的映射
  const ctrlCfgs = computed(() => fieldCfg.value.ctrlCfgs)

  // 所有插槽作用域的名称，即自定义组件
  const slotsWedigets = computed(() => {
    const customComps = realFieldWedgits.value.filter(i => i.type === 'custom')
    const map = new Map()
    customComps.forEach(i => {
      map.set(i.config.compName, i)
    })
    return [...map.values()]
  })

  return {
    realFieldWedgits,
    ctrlCfgs,
    slotsWedigets,
    treeList,
  }
}
