<template>
  <MakerLayout v-model="visible" :topTitle="topTitle" :inner="inner">
    <CompsList></CompsList>
    <CenterContainer @onSave="handleSave">
      <!-- 作用域插槽，用于自定义外部组件插槽 -->
      <template
        v-for="slot in slotsWedigets"
        :key="slot.config.compName"
        v-slot:[`custom-${slot.config.compName}`]="{ node }"
      >
        <slot :name="`custom-${slot.config.compName}`" v-bind:node="node"></slot>
      </template>
    </CenterContainer>
    <RightConfig></RightConfig>
  </MakerLayout>
</template>

<script setup>
import MakerLayout from './layouts/MakerLayout/index.vue'
import CompsList from './layouts/CompsList/index.vue'
import CenterContainer from './layouts/CenterContainer/index.vue'
import RightConfig from './layouts/RightConfig/index.vue'
import useStoreCenter from './hooks/store-center'
import useRealFields from '../core/hooks/use-real-fields'

const emit = defineEmits(['onSave'])
defineOptions({ name: 'BFormMaker' })
defineProps({
  topTitle: {
    type: String,
    default: 'FormMaker 表单设计器',
  },
  inner: Boolean,
})

const visible = defineModel({ type: Boolean, default: false })

const { initSchema, widgetForm } = useStoreCenter()
const { slotsWedigets } = useRealFields(widgetForm)

initSchema({})

function handleSave() {
  emit('onSave', widgetForm.value)
}
</script>
