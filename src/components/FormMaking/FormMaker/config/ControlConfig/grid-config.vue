<template>
  <div class="comp-config-container">
    <cfg-field label="控件类型" :labelWidth="labelWidth">
      <b-tag>{{ data.name }}</b-tag>
    </cfg-field>
    <cfg-field label="控件间距" :labelWidth="labelWidth">
      <b-space>
        <b-input-number v-model="data.config.gutter" :min="4" :step="2" :max="24" :size="size" />

        <b-radio-group v-model="data.config.gutter" :size="size" type="button">
          <b-radio :label="8">8</b-radio>
          <b-radio :label="16">16</b-radio>
          <b-radio :label="24">24</b-radio>
        </b-radio-group>
      </b-space>
    </cfg-field>
    <cfg-field label="水平方向">
      <b-select v-model="data.config.justify" size="small">
        <b-option
          v-for="item in justifyOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></b-option>
      </b-select>
    </cfg-field>
    <cfg-field label="垂直方向">
      <b-select v-model="data.config.align" size="small">
        <b-option
          v-for="item in alignOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></b-option>
      </b-select>
    </cfg-field>

    <cfg-field
      label="列配置项"
      tooltip="24栏栅格模式，需要自定义每列所占的栅格数。"
      labelPosition="right"
    >
      <b-radio-group v-model="col" size="small" type="button" @change="changeCol">
        <b-radio :label="2">2列</b-radio>
        <b-radio :label="3">3列</b-radio>
        <b-radio :label="4">4列</b-radio>
      </b-radio-group>
    </cfg-field>

    <b-table
      edit-table
      :columns="columns"
      :data="data.columns"
      draggable
      drag-handle=".handle"
      @drag-drop="handleDragDrop"
    >
      <template #handle>
        <drag-handle />
      </template>
      <template #span="{ index }">
        <b-input-number
          v-model="data.columns[index].span"
          :min="1"
          :max="24"
          always
        ></b-input-number>
      </template>
      <template #action="{ index }">
        <b-button
          type="text"
          text-color="danger"
          :disabled="data.columns.length === 1"
          @click="handleRemove(index)"
        >
          <b-icon name="minus-circle" />
        </b-button>
      </template>
    </b-table>

    <div class="mt-8 mb-8">
      <b-button icon="plus" dashed style="width: 100%; border-radius: 8px" @click="handleAddColumn">
        添加列
      </b-button>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'GridConfig' })
import { deepCopy } from '../../../core/utils/utils'
import { ref } from 'vue'

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
  { title: '栅格占据的列数(最大24)', slot: 'span' },
  { title: ' ', slot: 'action', width: 40, align: 'center' },
]

const col = ref(data.value.columns.length)

const justifyOptions = [
  { value: 'start', label: '左对齐' },
  { value: 'end', label: '右对齐' },
  { value: 'center', label: '居中' },
  { value: 'space-between', label: '两端对齐' },
  { value: 'space-around', label: '两侧间隔相等' },
]

const alignOptions = [
  { value: 'top', label: '顶部对齐' },
  { value: 'bottom', label: '底部对齐' },
  { value: 'middle', label: '居中对齐' },
]

// 列操作
function changeCol(num) {
  // 缓存现有list
  let oldList = deepCopy(data.value.columns)
  data.value.columns = []
  for (let i = 0; i < num; i++) {
    data.value.columns.push({
      span: 24 / num,
      list: oldList[i] ? oldList[i].list : [],
    })
  }
}

// grid 列添加项
function handleAddColumn() {
  data.value.columns.push({
    span: 12,
    list: [],
  })
  col.value = data.value.columns.length
}

// 项移除
function handleRemove(index) {
  data.value.columns.splice(index, 1)
  col.value = data.value.columns.length
}

function handleDragDrop(newList) {
  data.value.columns = [...newList]
}
</script>

<style scoped></style>
