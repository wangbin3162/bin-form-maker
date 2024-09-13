<template>
  <div class="right-config-container">
    <div class="top-fix">
      <div
        v-for="item in tabs"
        :key="item.key"
        class="tab-item"
        :class="{ active: item.key === currentCfgTab }"
        @click="currentCfgTab = item.key"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="config-content">
      <div v-if="currentCfgTab === 'widget'" style="height: 100%">
        <WidgetConfig v-if="selectWidget" v-model="selectWidget"></WidgetConfig>
        <div v-else style="height: 300px" flex="main:center cross:center">请添加组件</div>
      </div>
      <FormConfig v-else v-model="widgetForm.config"></FormConfig>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useStoreCenter from '@/components/FormMaking/FormMaker/hooks/store-center'

defineOptions({ name: 'RightConfig' })

const { selectWidget, currentCfgTab, widgetForm } = useStoreCenter()

const tabs = [
  { key: 'widget', title: '控件属性' },
  { key: 'form', title: '表单属性' },
]
</script>

<style scoped>
.right-config-container {
  width: 350px;
  height: 100%;
  .top-fix {
    height: 45px;
    line-height: 45px;
    display: flex;
    border-bottom: 1px solid var(--bin-border-color-base);
    padding: 0 5px;
    .tab-item {
      position: relative;
      width: 50%;
      text-align: center;
      transition: background 0.2s;
      cursor: pointer;
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      font-weight: 500;
      &.active {
        border-bottom: 2px solid var(--bin-color-primary);
      }
    }
  }
  .config-content {
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: auto;
    overflow-x: hidden;

    :deep(.bin-form-item) {
      margin-bottom: 16px;
      .bin-form-item__error {
        padding-top: 2px;
      }
    }
  }
}
</style>
