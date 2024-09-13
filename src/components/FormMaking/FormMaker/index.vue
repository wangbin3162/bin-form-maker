<template>
  <MakerLayout v-model="visible" :topTitle="topTitle" :inner="inner">
    <CompsList></CompsList>
    <CenterContainer></CenterContainer>
    <RightConfig></RightConfig>
  </MakerLayout>
</template>

<script setup>
import MakerLayout from './layouts/MakerLayout/index.vue'
import CompsList from './layouts/CompsList/index.vue'
import CenterContainer from './layouts/CenterContainer/index.vue'
import RightConfig from './layouts/RightConfig/index.vue'
import useStoreCenter from './hooks/store-center'

defineOptions({ name: 'BFormMaker' })
defineProps({
  topTitle: {
    type: String,
    default: 'FormMaker 表单设计器',
  },
  inner: Boolean,
})

const visible = defineModel({ type: Boolean, default: false })

const { initSchema } = useStoreCenter()

initSchema({})
</script>
