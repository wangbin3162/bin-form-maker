<template>
  <b-divider
    :align="config.align"
    :type="config.type"
    :dashed="config.dashed"
    :style="{ margin: config.margin, width: 'auto' }"
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
</script>
