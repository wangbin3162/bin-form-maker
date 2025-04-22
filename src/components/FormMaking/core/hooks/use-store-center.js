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

  /**
   * 初始化事件,第一个是表单对象的内容，第二个是自定义字段的列表,第三个是实际的字段对象
   * @param {obj} form 通过json字符串转换的对象信息{}，获取的初始化配置
   * @param {[]} fieldsDtos 实际字段的对象: { fieldName: '', fieldTitle: '', fieldLength: 10, fieldType: 'string|number', required: true },
   * @param {[]} customFields 自定义组件fields
   * @param {number} col 实际默认分栏，默认4列布局
   */
  function initSchema(form, fieldsDtos = [], customFields = [], col = 4) {
    selectWidget.value = null
    currentCfgTab.value = 'form'
    // 插入的自定义字段组件
    realFieldsDtos.value = [...fieldsDtos]
    slotsWedigets.value = [...customFields]
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
