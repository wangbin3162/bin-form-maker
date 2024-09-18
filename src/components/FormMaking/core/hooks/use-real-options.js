import { computed } from 'vue'

/**
 * 实际的选项来源，根据静态或者动态，从全局或者自定义options中取得
 * @param {*} config      当前组件的配置信息
 * @param {*} formConfig  全局form的配置信息
 * @returns
 */
export default function useRealOptions(config, formConfig) {
  const dataSource = computed(() => config.source)

  const realOptions = computed(() => {
    if (dataSource.value.type === 'static') return config.options
    else return getOptionsByDict(dataSource.value.confCode)
  })

  // 获取对应数据源下的数据options，用于定义默认值
  function getOptionsByDict(val) {
    const source = formConfig.globalDicts.find(i => i.key === val)
    if (source) return source.options
    return []
  }

  return {
    realOptions,
  }
}
