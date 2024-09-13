<template>
  <b-row type="flex" :gutter="config.gutter" :justify="config.justify" :align="config.align">
    <b-col v-for="(col, colIndex) in data.columns" :key="colIndex" :span="col.span ? col.span : 0">
      <slot v-bind:data="col"></slot>
    </b-col>
  </b-row>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'BFGrid' })

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
