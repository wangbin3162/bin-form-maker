<template>
  <b-modal v-model="previewModal" title="表单预览" width="1400px" screen-center>
    <div class="preview" style="min-height: 520px">
      <BFRenderForm v-if="previewModal" :default-model="defaultModel" ref="renderFormRef">
        <template #custom-comp="{ node }">
          <CustomNode v-bind="node" v-model="formModels[node.data.model]" />
        </template>
      </BFRenderForm>
    </div>
    <template #footer>
      <div flex="main:center cross:center">
        <b-button @click="previewModal = false">关 闭</b-button>
        <template v-if="viewType !== 'DETAIL'">
          <b-button @click="formReset">重 置</b-button>
          <DebugModal
            style="display: inline-block; margin: 0 8px"
            :data="{ formModels }"
            title="查看数据"
          >
            <b-button icon="edit-square">查看数据</b-button>
          </DebugModal>
          <b-button type="primary" @click="formSubmit">测试提交</b-button>
        </template>
      </div>
    </template>
  </b-modal>
</template>

<script setup>
defineOptions({ name: 'FormPreview' })
import { ref } from 'vue'
import useRenderStore from '../core/hooks/use-render-store'
import DebugModal from '../FormMaker/components/DebugModal/index.vue'
import { Message } from 'bin-ui-design'

// 表单预览，这里需要根据实际情况，看是否需要插入自定义组件
import CustomNode from '@/components/FormMakingCustom/Custom/CustomNode.vue'

const previewModal = ref(false)
const viewType = ref('EDIT')

const { initSchema, formModels } = useRenderStore()

const defaultModel = ref({}) // 默认对象
const renderFormRef = ref(null)

function open(formData, realFields, customFields) {
  previewModal.value = true
  initSchema(formData, realFields, customFields)
}

async function formSubmit() {
  const result = await renderFormRef.value?.getFormData()
  if (!result) Message.error('校验失败!')
  else {
    Message.success('校验通过!')
    console.log(result)
  }
}

function formReset() {
  renderFormRef.value?.resetForm()
}

defineExpose({ open })
</script>
