<template>
  <div class="components-list">
    <div class="top-fix">
      <b-tabs v-model="activeTab" :data="tabs"></b-tabs>
    </div>
    <div class="config-content">
      <b-scrollbar>
        <div v-if="activeTab === 'comps'">
          <CompList title="布局控件" :list="layoutComponents" />
          <CompList title="表单控件" :list="basicComponents" />
          <!-- 高级字段待定如上传等 -->
          <CompList
            title="自定义控件"
            v-if="slotsWedigets.length > 0"
            :list="slotsWedigets"
            is-custom
          />
          <!-- 实际字段 -->
          <CompList
            title="属性字段"
            v-if="realFieldsDtos.length > 0"
            :list="realFieldsDtos"
            is-field
          />
        </div>
        <div v-else class="p8">
          <b-tree :data="treeList" ref="treeRef" @select-change="handleSelect"></b-tree>
        </div>
      </b-scrollbar>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'CompsList' })
import { ref } from 'vue'
import { basicComponents, layoutComponents } from '../../../core/config/component-list'
import useMakerStore from '../../hooks/useMakerStore'
import CompList from './comp-list.vue'

const activeTab = ref('comps')
const treeRef = ref(null)

const tabs = [
  { key: 'comps', title: '组件', icon: 'appstore' },
  { key: 'form', title: '大纲', icon: 'cluster' },
]

const { handleSelectWidget, treeList, ctrlCfgs, slotsWedigets, realFieldsDtos } = useMakerStore()

function handleSelect(selected, node) {
  if (['col', 'tag'].includes(node.type)) {
    treeRef.value?.unselectAll()
  } else {
    const com = ctrlCfgs.value[node.model]
    handleSelectWidget(com)
  }
}
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
  :deep(.bin-collapse-wrap) {
    .header .arrow {
      transform: translateY(-50%) rotate(-90deg);
      .b-iconfont {
        font-size: 12px;
      }
    }
    &.bin-collapse-wrap-active .header .arrow {
      transform: translateY(-50%) rotate(0);
    }
  }
}
</style>
