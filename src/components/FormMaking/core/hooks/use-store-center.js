import { getNewFromCfg } from '../config/component-cfg'
import { ref, computed } from 'vue'
import useRealFields from './use-real-fields'
import { setDefaultLayouts } from '../utils/defaultLayout'

const status = {
  // 控件form对象配置信息
  widgetForm: ref(getNewFromCfg({})),
  selectWidget: ref(),
  currentCfgTab: ref('form'), // 当前右侧配置项的配置值
  slotsWedigets: ref([]), // 外部插槽的内容
  realFieldsDtos: ref([]), // 外部实际传入的字段
}

/**
 * 数据中心，用于存储所有数据相关内容和操作
 */
export default function useStoreCenter() {
  const { widgetForm, selectWidget, currentCfgTab, slotsWedigets, realFieldsDtos } = status

  const { realFieldWedgits, ctrlCfgs, treeList } = useRealFields(widgetForm)

  const formConfig = computed(() => widgetForm.value.config)

  // 初始化事件
  function initSchema(form, customFields = [], fieldsDtos = [], col = 4) {
    // 插入的自定义字段组件
    slotsWedigets.value = [...customFields]
    realFieldsDtos.value = [...fieldsDtos]
    // 初始化
    widgetForm.value = getNewFromCfg(form)
    // 设置初始化布局
    setDefaultLayouts(widgetForm, fieldsDtos, col)
    console.log('------------------- 初始化schema -------------------', widgetForm.value)
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
    realFieldsDtos,
    treeList,
    // func
    initSchema,
  }
}
