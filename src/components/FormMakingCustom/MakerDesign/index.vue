<template>
  <div style="display: inline-block">
    <slot>
      <b-button :type="btnType" :disabled="btnDisabled" @click="openDesign(jsonStr)">
        {{ btnText }}
      </b-button>
    </slot>

    <BFormMaker
      v-model="visible"
      top-title="表单设计"
      :customFields="customFields"
      :realFields="realFields"
      ref="makerRef"
      @onSave="saveFormSchema"
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
// 表单设计器
import BFormMaker from '@/components/FormMaking/FormMaker/index.vue'
import useStoreCenter from '@/components/FormMaking/core/hooks/use-store-center'
import { toJson } from '@/components/FormMaking/core/utils/utils'
import DatasetCfg from '@/components/FormMakingCustom/Dataset/DatasetCfg.vue'
import CustomNode from '@/components/FormMakingCustom/Custom/CustomNode.vue'

const emit = defineEmits(['onSave'])

const props = defineProps({
  // 自定义字段
  customFields: {
    type: Array,
    default: () => [],
  },
  // 实际字段集合
  realFields: {
    type: Array,
    default: () => [],
  },
  jsonStr: {
    type: String,
    default: '',
  },
  btnText: {
    type: String,
    default: '表单设计',
  },
  btnType: {
    type: String,
    default: 'text',
  },
  btnDisabled: {
    type: Boolean,
  },
  defaultOpen: {
    type: Boolean,
  },
})

const { widgetForm, formConfig, initSchema } = useStoreCenter()

const visible = ref(false)

// 开启设计器
function openDesign(jsonStr) {
  const formSchema = toJson(jsonStr, {})
  initSchema(formSchema, props.realFields, props.customFields)
  visible.value = true
}

if (props.defaultOpen) {
  openDesign(props.jsonStr)
}

// 保存scheam
function saveFormSchema() {
  console.log('-----------------保存表单设计------------------')
  console.log(widgetForm.value)
  emit('onSave', widgetForm.value)
  visible.value = false
}

defineExpose({
  openDesign,
})
</script>
