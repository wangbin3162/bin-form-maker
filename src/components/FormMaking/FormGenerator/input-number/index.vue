<template>
  <b-input-number
    v-model="model"
    :size="formConfig.size"
    :style="{ width: config.width }"
    :always="config.btnPos === 'always'"
    :min="config.min"
    :max="config.max ? config.max : Infinity"
    :step="config.step"
    :precision="config.precision"
    :arrowUpIcon="config.arrowUpIcon"
    :arrowDownIcon="config.arrowDownIcon"
    :editable="config.editable"
    :readonly="config.readonly"
    :disabled="config.disabled"
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

const model = defineModel({ type: Number, default: null })

// config 配置项
const config = computed(() => props.data.config)
</script>
