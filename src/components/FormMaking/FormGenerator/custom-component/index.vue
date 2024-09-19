<template>
  <div class="custom-wrap">
    <slot :name="config.compName" v-bind:node="{ modelValue: model, data, formConfig }"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'BFCustomComponent' })

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
