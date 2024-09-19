import { watch } from 'vue'
import useRenderStore from './use-render-store'

/**
 * 创建并提供运行时事件交互所需的事件总线对象
 */
export function useFormEvents() {
  const { formConfig, formModels, customFun } = useRenderStore()

  // 全局事件监听
  function fromEventsRuntime() {
    if (formConfig.value.globalEvents.customScript?.enable) {
      console.log('初始化全局脚本监听')
      // 执行全局脚本函数
      customFun()
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
