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
      <FormConfig v-else v-model="widgetForm.config">
        <template #DataSetCfg="{ dataset }">
          <slot name="DataSetCfg" v-bind:dataset="dataset"></slot>
        </template>
      </FormConfig>
    </div>
  </div>
</template>

<script setup>
import useMakerStore from '../../hooks/useMakerStore'

defineOptions({ name: 'RightConfig' })

const { selectWidget, currentCfgTab, widgetForm } = useMakerStore()

const tabs = [
  { key: 'widget', title: '控件属性' },
  { key: 'form', title: '表单属性' },
]
</script>

<style>
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

    .bin-form-item {
      margin-bottom: 16px;
      .bin-form-item__error {
        padding-top: 2px;
      }
    }
  }

  /* 组件的内部样式 */
  .comp-config-container {
    padding: 0 10px;
  }
  .status-container {
    border-top: 1px solid var(--bin-border-color-light);
    padding: 16px 5px;
    .status-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px dashed var(--bin-border-color-light);
      &:last-child {
        border-bottom: none;
      }
    }
    .checkbox {
      padding: 0 8px;
      .bin-checkbox {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
