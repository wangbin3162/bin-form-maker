import { getNewFromCfg } from '../config/component-cfg'
import { ref, computed } from 'vue'
import useRealFields from './use-real-fields'

const status = {
  // 控件form对象配置信息
  widgetForm: ref(getNewFromCfg({})),
  selectWidget: ref(),
  currentCfgTab: ref('form'), // 当前右侧配置项的配置值
  slotsWedigets: ref([]), // 外部插槽的内容
}

/**
 * 数据中心，用于存储所有数据相关内容和操作
 */
export default function useStoreCenter() {
  const { widgetForm, selectWidget, currentCfgTab, slotsWedigets } = status

  const { realFieldWedgits, ctrlCfgs, treeList } = useRealFields(widgetForm)

  const formConfig = computed(() => widgetForm.value.config)

  // 初始化事件
  function initSchema(form) {
    widgetForm.value = getNewFromCfg(form)
    console.log('------------------- 初始化schema -------------------')
    console.log(widgetForm.value)
    console.log('-----------------------------------------------------')
  }

  return {
    widgetForm,
    selectWidget,
    currentCfgTab,
    formConfig,
    // realfields status
    realFieldWedgits,
    ctrlCfgs,
    slotsWedigets,
    treeList,
    // func
    initSchema,
  }
}
