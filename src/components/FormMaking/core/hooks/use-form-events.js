import { watch } from 'vue'
import useRenderStore from './use-render-store'
import { buildCompareStr } from '../utils/events-enum'

/**
 * 创建并提供运行时事件交互所需的事件总线对象
 */
export function useFormEvents() {
  const { formConfig, formModels, customFun, customFunByStr } = useRenderStore()

  // 全局事件监听
  function fromEventsRuntime() {
    if (formConfig.value.globalEvents.type === 'script') {
      // console.log('初始化全局脚本监听')
      // 执行全局脚本函数
      customFun()
    } else {
      // 否则查看onEvents中是否存在规则对象，存在则需要动态拼接字段进行脚本生成并执行
      const eventList = formConfig.value.globalEvents.onEvents
      const str = buildCompareStr(eventList)
      // console.log(str)
      customFunByStr(str)
    }
  }

  watch(
    () => formModels.value,
    () => {
      fromEventsRuntime()
    },
    { immediate: true, deep: true },
  )
}
