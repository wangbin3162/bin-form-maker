<template>
  <div class="tab-container">
    <div v-if="isMounted" style="flex-grow: 1">
      <b-tabs v-model="config.defaultTab" :data="data.tabs" :type="config.type"></b-tabs>
    </div>

    <div :style="contentStyle">
      <template v-for="item in data.tabs" :key="item.key">
        <div v-show="item.key === config.defaultTab">
          <slot v-bind:data="{ list: item.components }"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
defineOptions({ name: 'BFTabContainer' })

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

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

const contentStyle = computed(() => {
  const style = { padding: config.value.padding + 'px' }
  return config.value.type === 'card'
    ? { ...style, border: '1px solid #e4e7ed', borderTop: 'none' }
    : style
})
</script>

<style scoped>
.tab-container {
  background: #fff;
}
</style>
