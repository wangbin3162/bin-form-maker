import { getNewFromCfg } from '../config/component-cfg'
import { ref, computed } from 'vue'
import useRealFields from './use-real-fields'

const status = {
  // 控件form对象配置信息
  widgetForm: ref(getNewFromCfg({})),
  selectWidget: ref(),
  currentCfgTab: ref('form'), // 当前右侧配置项的配置值
  slotsWedigets: ref([]), // 外部插槽的内容
  modelDataDtos: ref([]), // 外部传入的表单模型数据
}

/**
 * 数据中心，用于存储所有数据相关内容和操作
 */
export default function useStoreCenter() {
  const { widgetForm, selectWidget, currentCfgTab, slotsWedigets, modelDataDtos } = status

  const { realFieldWedgits, ctrlCfgs, treeList } = useRealFields(widgetForm)

  const formConfig = computed(() => widgetForm.value.config)

  /**
   * 初始化事件,第一个是表单对象的内容，第二个是自定义字段的列表,第三个是实际的字段对象
   * @param {obj} form 通过json字符串转换的对象信息{}，获取的初始化配置
   * @param {[]} modelData 实际字段的对象: { fieldName: '', fieldTitle: '', fieldLength: 10, fieldType: 'string|number', required: true },
   * @param {[]} customFields 自定义组件fields
   */
  function initSchema(form, modelData = [], customFields = []) {
    selectWidget.value = null
    currentCfgTab.value = 'form'
    // 插入的自定义字段组件
    slotsWedigets.value = [...customFields]
    modelDataDtos.value = [...modelData]
    // 初始化
    widgetForm.value = getNewFromCfg(form)
    console.log('------------------- 初始化schema -------------------', widgetForm.value)
  }

  return {
    widgetForm,
    selectWidget,
    currentCfgTab,
    formConfig,
    modelDataDtos,
    // realfields status
    realFieldWedgits,
    ctrlCfgs,
    slotsWedigets,
    treeList,
    // func
    initSchema,
  }
}
