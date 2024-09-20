<template>
  <div class="comp-config-container">
    <CfgField label="控件类型" :labelWidth="labelWidth">
      <b-tag>{{ data.name }}</b-tag>
    </CfgField>
    <CfgField label="标签类型">
      <b-radio-group v-model="data.config.type" size="small" type="button">
        <b-radio label="default">默认</b-radio>
        <b-radio label="card">卡片</b-radio>
      </b-radio-group>
    </CfgField>
    <CfgField label="内容边距">
      <b-space>
        <b-input-number
          v-model="data.config.padding"
          :min="0"
          :max="24"
          size="small"
        ></b-input-number>
        <b-radio-group v-model="data.config.padding" type="button" :size="size">
          <b-radio :label="8"></b-radio>
          <b-radio :label="16"></b-radio>
          <b-radio :label="24"></b-radio>
        </b-radio-group>
      </b-space>
    </CfgField>
    <CfgField label="下边距">
      <b-space>
        <b-input-number
          v-model="data.config.margin"
          :min="0"
          :max="24"
          size="small"
        ></b-input-number>
        <b-radio-group v-model="data.config.margin" type="button" :size="size">
          <b-radio :label="8"></b-radio>
          <b-radio :label="16"></b-radio>
          <b-radio :label="24"></b-radio>
        </b-radio-group>
      </b-space>
    </CfgField>

    <CfgField label="默认选中">
      <b-select v-model="data.config.defaultTab" size="small">
        <b-option v-for="item in data.tabs" :key="item.key" :value="item.key" :label="item.title" />
      </b-select>
    </CfgField>

    <b-table
      edit-table
      :columns="columns"
      :data="data.tabs"
      draggable
      DragHandle=".handle"
      @drag-drop="handleDragDrop"
    >
      <template #handle>
        <DragHandle />
      </template>
      <template #span="{ index }">
        <b-input v-model="data.tabs[index].title" clearable></b-input>
      </template>
      <template #action="{ index }">
        <b-button
          type="text"
          text-color="danger"
          :disabled="data.tabs.length === 2"
          @click="handleRemove(index)"
        >
          <b-icon name="minus-circle" />
        </b-button>
      </template>
    </b-table>
    <div class="mt-8 mb-8">
      <b-button icon="plus" dashed style="width: 100%; border-radius: 8px" @click="handleAdd">
        添加Tab
      </b-button>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'TabContainerConfig' })
import { generateId } from '../../core/utils/utils'
import { Message } from 'bin-ui-design'
import DragHandle from '../components/DragHandle/index.vue'
import CfgField from '../components/Gui/CfgField.vue'

const data = defineModel({ type: Object })

defineProps({
  size: {
    type: String,
    default: 'small',
  },
  labelWidth: {
    type: String,
    default: '85px',
  },
})

const columns = [
  { title: ' ', slot: 'handle', width: 40, align: 'center' },
  { title: '标签名称', slot: 'span' },
  { title: ' ', slot: 'action', width: 40, align: 'center' },
]

// 添加Tab选项卡
function handleAdd() {
  data.value.tabs.push({
    key: 'Tab' + generateId(),
    title: '新标签',
    components: [],
  })
}

// Tab设置的删除按钮
function handleRemove(index) {
  if (data.value.tabs.length < 3) {
    Message.warning('请至少保留两个Tab选项卡！')
  } else {
    data.value.tabs.splice(index, 1)
  }
}

function handleDragDrop(newList) {
  data.value.tabs = [...newList]
}
</script>

<style scoped></style>
