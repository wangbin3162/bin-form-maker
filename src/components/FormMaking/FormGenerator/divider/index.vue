<template>
  <b-divider
    :align="config.align"
    :type="config.type"
    :dashed="config.dashed"
    :style="styles"
    class="divider-container"
  >
    {{ data.label }}
  </b-divider>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'BFDivider' })

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  // 全局配置参数
  formConfig: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)

const styles = computed(() => {
  const cfg = {
    width: 'auto',
    margin: config.value.margin,
    '--divider-font-size': config.value.fontSize || '16px',
  }
  if (config.value.hideLine) cfg.backgroundColor = 'transparent'
  return cfg
})
</script>

<style scoped>
.divider-container {
  :deep(.bin-divider-inner-text) {
    font-size: var(--divider-font-size);
  }
}
</style>
