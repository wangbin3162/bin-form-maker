<template>
  <div class="components-list">
    <div class="top-fix">
      <b-tabs v-model="activeTab" :data="tabs"></b-tabs>
    </div>
    <div class="config-content">
      <b-scrollbar>
        <div v-if="activeTab === 'comps'">
          <CompList title="布局组件" :list="layoutComponents" />
          <CompList title="基础组件" :list="basicComponents" />
        </div>
        <div v-else>大纲树</div>
      </b-scrollbar>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'CompsList' })
import { ref } from 'vue'
import { basicComponents, layoutComponents } from '../../../core/config/component-list'

const activeTab = ref('comps')

const tabs = [
  { key: 'comps', title: '组件', icon: 'appstore' },
  { key: 'form', title: '大纲', icon: 'cluster' },
]
</script>

<style scoped>
.components-list {
  width: 250px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .top-fix {
    height: 45px;
    border-bottom: 1px solid var(--bin-border-color-base);
    padding: 0 5px;
    :deep(.bin-tabs-wrapper) {
      .nav-wrapper,
      .tab-item {
        height: 45px;
      }
      .tab-item {
        padding: 0 12px;
        .b-iconfont {
          font-size: 18px;
          top: 0;
        }
      }
    }
  }
  .config-content {
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
