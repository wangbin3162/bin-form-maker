<template>
  <div class="p24">
    <MakerDesign
      :real-fields="realFields"
      :custom-fields="customFields"
      :json-str="jsonStr"
      default-open
      ref="renderFormRef"
      @on-save="handleSave"
    />
  </div>
</template>

<script setup>
import { useRenderEdit } from './useRenderEdit'
// 动态表单设计器相关操作
const { MakerDesign, jsonStr, realFields, customFields, renderFormRef } = useRenderEdit()

function handleSave(widgetForm) {
  console.log(widgetForm)
}
</script>
