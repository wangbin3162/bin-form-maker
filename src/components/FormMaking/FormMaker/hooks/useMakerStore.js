import useStoreCenter from '../../core/hooks/use-store-center'
import { createComponent } from '../../core/config/component-cfg'
import { nextTick } from 'vue'

/**
 * maker设计器专用store hook，用于操作和获取不同的数据信息。
 */
export default function useMakerStore() {
  const {
    widgetForm,
    selectWidget,
    currentCfgTab,
    formConfig,
    // realfields status
    realFieldWedgits,
    ctrlCfgs,
    slotsWedigets,
    treeList,
  } = useStoreCenter()

  // btn-bar 清空事件
  function clearSchema() {
    widgetForm.value.list = []
    selectWidget.value = null
  }

  // 增加一个组件
  function addWidget(item, isCustom) {
    const com = createComponent(item.type, item.name, isCustom)
    widgetForm.value.list.push(com)
    handleSelectWidget(com)
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

  // 选中一个组件
  function handleSelectWidget(widget) {
    selectWidget.value = widget
    currentCfgTab.value = 'widget'
  }

  // 基础布局模块增加
  function handleWidgetAdd({ newIndex }, list) {
    handleSelectWidget(list[newIndex])
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
    clearSchema,
    addWidget,
    deleteWidget,
    isComSelected,
    handleSelectWidget,
    handleWidgetAdd,
  }
}
