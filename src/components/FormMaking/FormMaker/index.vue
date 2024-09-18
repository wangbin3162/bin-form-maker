<template>
  <MakerLayout v-model="visible" :topTitle="topTitle" :inner="inner">
    <CompsList :customFields="customFields" />
    <CenterContainer @onSave="handleSave">
      <!-- 作用域插槽，用于自定义外部组件插槽 -->
      <template v-for="slot in slotsWedigets" :key="slot.type" v-slot:[slot.type]="{ node }">
        <slot :name="slot.type" v-bind:node="node"></slot>
      </template>
    </CenterContainer>
    <RightConfig>
      <template #DataSetCfg="{ dataset }">
        <slot name="DataSetCfg" v-bind:dataset="dataset"></slot>
      </template>
    </RightConfig>
  </MakerLayout>
</template>

<script setup>
import MakerLayout from './layouts/MakerLayout/index.vue'
import CompsList from './layouts/CompsList/index.vue'
import CenterContainer from './layouts/CenterContainer/index.vue'
import RightConfig from './layouts/RightConfig/index.vue'
import useMakerStore from './hooks/useMakerStore'

const emit = defineEmits(['onSave'])
defineOptions({ name: 'BFormMaker' })

const props = defineProps({
  topTitle: {
    type: String,
    default: 'FormMaker 表单设计器',
  },
  inner: Boolean,
  // 自定义字段
  customFields: {
    type: Array,
    default: () => [],
  },
})

const visible = defineModel({ type: Boolean, default: false })

const { widgetForm, slotsWedigets } = useMakerStore()

slotsWedigets.value = [...props.customFields]

console.log(slotsWedigets.value)

function handleSave() {
  emit('onSave', widgetForm.value)
}
</script>
