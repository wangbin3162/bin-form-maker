import useStoreCenter from '../../core/hooks/use-store-center'
import { setDefaultLayouts } from '../../core/utils/defaultLayout'
import { nextTick, computed } from 'vue'

/**
 * maker设计器专用store hook，用于操作和获取不同的数据信息。
 */
export default function useMakerStore() {
  const {
    initSchema,
    widgetForm,
    selectWidget,
    currentCfgTab,
    formConfig,
    realFieldsDtos,
    // realfields status
    realFieldWedgits,
    ctrlCfgs,
    slotsWedigets,
    treeList,
  } = useStoreCenter()

  // 所有实际已经在画布中的字段models
  const alreadyInFieldModels = computed(() => realFieldWedgits.value.map(i => i.model))

  // btn-bar 清空事件
  function clearSchema() {
    widgetForm.value.list = []
    selectWidget.value = null
  }

  // 增加一个组件
  function addWidget(item) {
    widgetForm.value.list.push(item)
    handleSelectWidget(item)
  }

  function isComSelected(widget) {
    return selectWidget.value?.key === widget.key
  }

  // 移除一个控件
  function deleteWidget(list, index) {
    if (list.length - 1 === index) {
      if (index === 0) {
        selectWidget.value = null
      } else {
        selectWidget.value = list[index - 1]
      }
    } else {
      selectWidget.value = list[index + 1]
    }

    nextTick(() => {
      list.splice(index, 1)
    })
  }

  // 更改一个控件
  function changeWidget(widget) {
    selectWidget.value = null
    nextTick(() => {
      selectWidget.value = widget
    })
  }

  // 选中一个组件
  function handleSelectWidget(widget) {
    selectWidget.value = widget
    currentCfgTab.value = 'widget'
  }

  // 基础布局模块增加
  function handleWidgetAdd({ newIndex }, list) {
    handleSelectWidget(list[newIndex])
  }

  // 快速配置
  function quickLayout(col = 4) {
    clearSchema()

    setDefaultLayouts(widgetForm, realFieldsDtos.value, col)
  }

  return {
    widgetForm,
    selectWidget,
    currentCfgTab,
    formConfig,
    slotsWedigets,
    realFieldsDtos,
    // realfields status
    realFieldWedgits,
    alreadyInFieldModels,
    ctrlCfgs,
    treeList,
    // func
    clearSchema,
    addWidget,
    changeWidget,
    deleteWidget,
    isComSelected,
    handleSelectWidget,
    handleWidgetAdd,
    quickLayout,
    initSchema,
  }
}
