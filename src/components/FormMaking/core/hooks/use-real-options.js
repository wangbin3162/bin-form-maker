import { computed, watch } from 'vue'

/**
 * 实际的选项来源，根据静态或者动态，从全局或者自定义options中取得
 * @param {Ref} config      当前组件的配置信息 Ref
 * @param {props} formConfig  全局form的配置信息 Ref
 * @returns
 */
export default function useRealOptions(config, formConfig) {
  const dataSource = computed(() => config.value.source)

  const realOptions = computed(() => {
    if (dataSource.value.type === 'static') return config.value.options
    else return getOptionsByDict(dataSource.value.confCode)
  })

  // 获取对应数据源下的数据options，用于定义默认值
  function getOptionsByDict(val) {
    const source = formConfig.dataSet.find(i => i.key === val)
    if (source) return source.options
    return []
  }

  // 全局字典改变，如果改变且当前是动态数据源，则去查找匹配，如已经移除或查找不到，则更改为静态数据
  watch(
    () => formConfig.dataSet,
    () => {
      if (dataSource.value.type !== 'static') {
        const source = formConfig.dataSet.find(i => i.key === dataSource.value.confCode)
        if (!source) {
          dataSource.value.type = 'static'
          dataSource.value.confCode = ''
          dataSource.value.confName = ''
          // 默认值也清空
          config.value.defaultValue = ''
        }
      }
    },
    { deep: true },
  )

  return {
    realOptions,
  }
}
