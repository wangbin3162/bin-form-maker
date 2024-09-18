<template>
  <div class="p24">
    <b-button type="primary" @click="visible = true">打开设计器</b-button>
    <BFormMaker v-model="visible" @onSave="handleSave">
      <template #custom-customComp="{ node }">
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

function handleSave(widgetForm) {
  console.log(widgetForm)
}
</script>
