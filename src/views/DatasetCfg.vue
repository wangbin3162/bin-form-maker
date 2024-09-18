<template>
  <div class="form-dict-wrap">
    <!-- <b-ace-editor :model-value="JSON.stringify(dataset, null, 2)" readonly height="200" /> -->

    <b-table
      :columns="columns"
      :data="dataset"
      size="small"
      max-height="440"
      edit-table
      edit-table-detail
    >
      <template #action="{ index }">
        <action-button
          type="text"
          icon="minus-circle"
          color="danger"
          is-icon
          tooltip="删除"
          @click="removeDict(index)"
        ></action-button>
      </template>
    </b-table>

    <div class="pt-8">
      <b-button
        icon="book"
        dashed
        size="small"
        style="width: 100%; border-radius: 8px"
        @click="handleConfig"
      >
        表单字典配置
      </b-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const data = defineModel({ type: Object })

const columns = [
  { title: '字典名称', key: 'key', minWidth: 100, tooltip: true },
  { title: '字典编码', key: 'name', minWidth: 100, tooltip: true },
  { title: ' ', slot: 'action', width: 50, align: 'center' },
]

const dataset = computed(() => data.value.dataSet)

function removeDict(idx) {
  dataset.value.splice(idx, 1)
}

// 增加一个字典配置，这里模拟用来增加一个数据源配置
function handleConfig() {
  dataset.value.push({
    key: 'newKey_' + dataset.value.length,
    name: '模拟字典' + dataset.value.length,
    options: [
      {
        key: 'o1',
        label: '标签1',
      },
      {
        key: 'o2',
        label: '标签2',
      },
    ],
  })
}
</script>
