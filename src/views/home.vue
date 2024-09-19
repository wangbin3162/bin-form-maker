<template>
  <div class="p24">
    <b-button type="primary" @click="visible = true">打开设计器</b-button>
    <BFormMaker
      v-model="visible"
      :customFields="customFields"
      :realFields="realFields"
      @onSave="handleSave"
    >
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

// 实际字段列表，注意，这里定义的为基本结构，使用时需要按这种方式进行一遍format处理后进行传入
const realFields = [
  {
    fieldName: 'fname',
    fieldTitle: '员工姓名',
    fieldLength: 10,
    fieldType: 'string', // 根据实际需求，根据字段的类型，进行初步筛选并定义 string, number
    required: true,
  },
  {
    fieldName: 'fnumber',
    fieldTitle: '员工编号',
    fieldLength: 10,
    fieldType: 'string', // 根据实际需求，根据字段的类型，进行初步筛选并定义 string, number
    required: true,
  },
  {
    fieldName: 'fage',
    fieldTitle: '员工年龄',
    fieldLength: 10,
    fieldType: 'number', // 根据实际需求，根据字段的类型，进行初步筛选并定义 string, number
    required: false,
  },
  {
    fieldName: 'merit_pay',
    fieldTitle: '基本工资',
    fieldLength: 10,
    fieldType: 'number', // 根据实际需求，根据字段的类型，进行初步筛选并定义 string, number
    required: false,
  },
  {
    fieldName: 'year_month',
    fieldTitle: '薪资周期',
    fieldLength: 10,
    fieldType: 'string', // 根据实际需求，根据字段的类型，进行初步筛选并定义 string, number
    required: false,
  },
]

function handleSave(widgetForm) {
  console.log(widgetForm)
}
</script>
