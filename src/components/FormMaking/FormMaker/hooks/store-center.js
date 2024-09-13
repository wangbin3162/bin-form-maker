import {
  createComponent,
  getNewFromCfg,
} from '@/components/FormMaking/FormMaker/config/component-cfg'
import { ref, computed, nextTick } from 'vue'

const status = {
  // 控件form对象配置信息
  widgetForm: ref({
    list: [], // list表示实际布局对象，实际存储的都为json。
    config: {}, // 表单层级的对象存储，存储表单信息以及表单字典映射。
  }),
  selectWidget: ref(),
  currentCfgTab: ref('form'), // 当前右侧配置项的配置值
}

export default function useStoreCenter() {
  const { widgetForm, selectWidget, currentCfgTab } = status

  // const realFieldWedgits = computed(() => fieldCfg.value.fieldList)

  // 初始化事件
  function initSchema(form) {
    widgetForm.value = getNewFromCfg(form)
    console.log(widgetForm.value)
  }

  // btn-bar 清空事件
  function clearSchema() {
    widgetForm.value.list = []
    selectWidget.value = null
  }

  // 增加一个组件
  function addWidget(item) {
    const com = createComponent(item.type)
    widgetForm.value.list.push(com)
    selectWidget.value = widgetForm.value.list[widgetForm.value.list.length - 1]
    currentCfgTab.value = 'widget'
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
  }

  return {
    widgetForm,
    selectWidget,
    currentCfgTab,
    // func
    initSchema,
    clearSchema,
    addWidget,
    deleteWidget,
    isComSelected,
    handleSelectWidget,
  }
}
