<template>
  <div class="center-container">
    <div class="top-fix" flex="main:justify cross:center">
      <div class="top-fix-left" flex="cross:center">
        <b-dropdown @command="quickCfg" v-if="realFieldsDtos.length">
          <b-button icon="layout" type="text">快速配置</b-button>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item :name="1">通栏布局</b-dropdown-item>
              <b-dropdown-item :name="2">双列布局</b-dropdown-item>
              <b-dropdown-item :name="4">四列布局</b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
      </div>
      <div class="top-fix-right">
        <b-button type="text" icon="eye" @click="handlePreview">预览</b-button>
        <b-divider type="vertical" />
        <DebugModal style="display: inline-block" :data="{ widgetForm }">
          <b-button type="text" icon="edit-square">查看JSON</b-button>
        </DebugModal>
        <b-divider type="vertical" />
        <b-button type="text" icon="export" @click="downloadCfg">导出JSON</b-button>
        <b-divider type="vertical" />
        <b-button type="text" icon="save" @click="handleSave">保存</b-button>
        <b-divider type="vertical" />
        <ActionButton
          type="text"
          color="#f5222d"
          icon="delete"
          message="确认清空画布吗？"
          confirm
          @click="clearSchema"
        >
          清空
        </ActionButton>
      </div>
    </div>
    <div class="scroll-content">
      <b-scrollbar>
        <div class="form-empty" v-if="widgetForm.list.length === 0">
          <b-empty>从左侧拖拽或点击来添加字段</b-empty>
        </div>
        <WidgetForm>
          <template v-for="slot in slotsWedigets" :key="slot.type" v-slot:[slot.type]="{ node }">
            <slot :name="slot.type" v-bind:node="node"></slot>
          </template>
        </WidgetForm>
      </b-scrollbar>
    </div>

    <FormPreview ref="previewRef">
      <template v-for="slot in slotsWedigets" :key="slot.type" v-slot:[slot.type]="{ node }">
        <slot :name="slot.type" v-bind:node="node"></slot>
      </template>
    </FormPreview>
  </div>
</template>

<script setup>
defineOptions({ name: 'CenterContainer' })
import useMakerStore from '../../hooks/useMakerStore'
import { generateId } from '../../../core/utils/utils'
import WidgetForm from './WidgetForm.vue'
import FormPreview from '../FormPreview/index.vue'
import ActionButton from '../../components/ActionButton/index.vue'
import DebugModal from '../../components/DebugModal/index.vue'

import { Message } from 'bin-ui-design'
import { ref } from 'vue'

const emit = defineEmits(['onSave'])

const { widgetForm, slotsWedigets, clearSchema, quickCfg, realFieldsDtos } = useMakerStore()

function downloadFile(content, fileName) {
  // filename，摘取了常用的部分，其实还有其他一些
  const typeMap = {
    pdf: 'application/pdf',
    doc: 'application/vnd.ms-word',
    docx: 'application/vnd.ms-word',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.ms-excel',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.ms-powerpoint',
    js: 'application/x-javascript',
    json: 'application/json',
    zip: 'application/zip',
    mp3: 'audio/mpeg',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    txt: 'text/plain',
    xml: 'image/text/xml',
  }
  const hg = fileName.split('.').pop().toLocaleLowerCase() || ''

  const data = new Blob([content], { type: typeMap[hg] })
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(data, fileName)
  } else {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(data)
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }
}

// 导出
const downloadCfg = () => {
  downloadFile(JSON.stringify(widgetForm.value, null, 2), `form_${generateId()}.json`)
  Message.success({ message: '模板文件已保存！', showClose: true })
}

function handleSave() {
  emit('onSave')
}

const previewRef = ref(null)

function handlePreview() {
  previewRef.value?.open(widgetForm.value, slotsWedigets.value)
}
</script>

<style scoped>
.center-container {
  position: relative;
  width: calc(100% - 600px);
  height: 100%;
  overflow: hidden;
  border-left: 1px solid var(--bin-border-color-base);
  border-right: 1px solid var(--bin-border-color-base);

  .top-fix {
    height: 45px;
    padding: 0 16px;
    border-bottom: 1px solid var(--bin-border-color-base);
  }
  .scroll-content {
    height: calc(100% - 45px);
    position: relative;
    background: #fafafa;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .form-empty {
    position: absolute;
    text-align: center;
    height: 20px;
    font-size: 20px;
    top: 120px;
    width: 100%;
    color: #ccc;
  }

  .quick-cfg {
    display: flex;
    flex-direction: column;
    :deep(.bin-button) {
      margin: 8px 0;
    }
  }
}
</style>
