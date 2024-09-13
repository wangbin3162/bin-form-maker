<template>
  <b-input-number
    v-model="model"
    :size="formConfig.size"
    :type="config.type"
    :style="{ width: config.width }"
    :always="config.btnPos === 'always'"
    v-bind="config"
  ></b-input-number>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'BFInputNumber' })

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

const model = defineModel({ type: String, default: '' })

// config 配置项
const config = computed(() => props.data.config)
</script>
