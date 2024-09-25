<template>
  <div class="custom-input">
    <div flex="cross:center" class="mb-5">
      <b-tag>自定义组件</b-tag>
      {{ model }}
    </div>
    <b-input v-model="model"></b-input>
  </div>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'BFCustomNode' })

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
