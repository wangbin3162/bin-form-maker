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

  return {
    realFieldWedgits,
    ctrlCfgs,
  }
}
