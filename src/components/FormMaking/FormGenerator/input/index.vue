<template>
  <b-input
    v-model="model"
    :size="formConfig.size"
    :type="config.type"
    :max-length="config.maxlength"
    v-bind="config"
  ></b-input>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'BFInput' })

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
