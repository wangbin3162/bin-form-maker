<template>
  <div class="render-form">
    <b-form
      ref="formRef"
      :model="formModels"
      :rules="formRules"
      :label-position="widgetForm.config.labelPosition"
      :label-suffix="widgetForm.config.labelSuffix"
      :label-width="`${widgetForm.config.labelWidth}px`"
      :size="widgetForm.config.size"
    >
      <!-- 附加递归嵌套控件 -->
      <RenderNest class="widget-form-list" :widgets="widgetForm.list" v-model="formModels">
        <template v-for="slot in slotsWedigets" :key="slot.type" v-slot:[slot.type]="{ node }">
          <slot :name="slot.type" v-bind:node="node"></slot>
        </template>
      </RenderNest>
    </b-form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFormEvents } from '../../core/hooks/use-form-events'
defineOptions({ name: 'RenderForm' })

const props = defineProps({
  defaultModel: {
    type: Object,
    default: () => ({}),
  },
})

import useRenderStore from '../../core/hooks/use-render-store'
import RenderNest from './RenderNest.vue'

const { widgetForm, formConfig, slotsWedigets, initForm, formModels, formRules } = useRenderStore()

initForm(props.defaultModel)

const formRef = ref(null)

// 获取数据对象
async function getFormData() {
  const valid = await formRef.value?.validate()
  if (valid) return formModels.value
  return false
}

function resetForm() {
  formRef.value?.resetFields()
}

if (formConfig.value.globalEvents) {
  useFormEvents()
}

defineExpose({
  getFormData,
  resetForm,
})
</script>
