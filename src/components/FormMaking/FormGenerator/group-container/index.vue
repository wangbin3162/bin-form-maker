<template>
  <div class="group-container">
    <b-collapse-wrap
      :collapse="config.collapse"
      :shadow="config.shadow"
      :style="{ marginBottom: config.margin ? config.margin + 'px' : '0' }"
    >
      <template #title>
        <div class="custom-title" :style="{ fontSize: (config.title.fontSize ?? 14) + 'px' }">
          <b-icon v-if="config.title.icon" :name="config.title.icon" />
          <span>{{ config.title.text }}</span>
        </div>
      </template>

      <div :style="{ padding: config.padding + 'px' }">
        <slot v-bind:data="{ list: data.components }"></slot>
      </div>
    </b-collapse-wrap>
  </div>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'BFGroupContainer' })

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

<style scoped>
.custom-title {
  position: relative;
  padding: 0 12px;
  height: 40px;
  display: flex;
  align-items: center;
  > i {
    margin-right: 5px;
  }
  &::before {
    content: '';
    position: absolute;
    background-color: var(--bin-color-primary);
    left: 0;
    top: 12px;
    bottom: 12px;
    width: 2px;
  }
}
</style>
