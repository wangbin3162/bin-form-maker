import useStoreCenter from '../../core/hooks/use-store-center'
import { nextTick, computed } from 'vue'
import { createComponent } from '../../core/config/component-cfg'
import { chunkArray } from '../../core/utils/utils'

/**
 * maker设计器专用store hook，用于操作和获取不同的数据信息。
 */
export default function useMakerStore() {
  const {
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

  function formatFieldComp(item) {
    // 如果是实际字段，则根据字段的标识来创建一个字符串或者一个数字输入
    const type = item.fieldType === 'number' ? 'input-number' : 'input'
    const com = createComponent(type, item.fieldTitle, false)
    // 追加字段和定义
    com.label = item.fieldTitle
    com.model = item.fieldName
    com.config.maxlength = +item.fieldLength
    if (item.required) {
      // 如果有必填，则追加一个必填校验
      com.config.required = true
      com.rules = [
        {
          name: '$required',
          type: 'string',
          trigger: 'blur',
          message: '必填项',
        },
      ]
    }
    return com
  }

  // 快速配置
  function quickCfg(num = 4) {
    clearSchema()

    // 通栏布局，相当于每个属性字段点击一遍
    if (num === 1) {
      realFieldsDtos.value.forEach(item => {
        const com = formatFieldComp(item)
        widgetForm.value.list.push(com)
      })
      // 配置表单属性
      widgetForm.value.config.labelPosition = 'left'
      widgetForm.value.config.labelSuffix = ':'
    } else {
      // 超过两栏，这里需要分割数组，按照，个数分割好
      const list = chunkArray(realFieldsDtos.value, num)
      // 遍历列，增加grid组件
      list.forEach(row => {
        const grid = createComponent('grid', '', false)
        // 设置栅格属性
        const span = 24 / num
        grid.columns = []
        row.forEach(col => {
          grid.columns.push({ span, list: [formatFieldComp(col)] })
        })
        console.log(grid)
        widgetForm.value.list.push(grid)
      })
      // 配置表单属性
      widgetForm.value.config.labelPosition = 'top'
      widgetForm.value.config.labelSuffix = ''
    }
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
    quickCfg,
    formatFieldComp,
  }
}
