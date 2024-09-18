<template>
  <div class="p24">
    <b-button type="primary" @click="visible = true">打开设计器</b-button>
    <BFormMaker v-model="visible" :customFields="customFields" @onSave="handleSave">
      <template #custom-comp="{ node }">
        <CustomNode v-bind="node" />
      </template>

      <template #DataSetCfg>
        <DatasetCfg v-model="formConfig" />
      </template>
    </BFormMaker>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BFormMaker from '@/components/FormMaking/FormMaker/index.vue'
import CustomNode from './CustomNode.vue'
import DatasetCfg from './DatasetCfg.vue'
import useStoreCenter from '@/components/FormMaking/core/hooks/use-store-center'

const visible = ref(true)

const { formConfig } = useStoreCenter()

// 自定义高级组件或者自定义组件
const customFields = [
  {
    type: 'custom-comp',
    name: '自定义组件',
    icon: 'appstoreadd',
  },
]

function handleSave(widgetForm) {
  console.log(widgetForm)
}
</script>
