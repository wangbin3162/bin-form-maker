import { computed } from 'vue'
import { getFieldsCfgByList } from './getRealFields'
/**
 * 获取真实的字段/控件列表
 * @param {控件对象} widgetForm Ref
 * @returns
 */
export default function useRealFields(widgetForm) {
  const fieldCfg = computed(() => getFieldsCfgByList(widgetForm.value.list))

  const realFieldWedgits = computed(() => fieldCfg.value.fieldList)
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
  }
}
