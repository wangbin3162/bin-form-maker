<template>
  <div class="events-cfg">
    <cfg-field label="事件类型" :labelWidth="labelWidth">
      <b-radio-group v-model="eventCfg.type" type="button" :size="size">
        <b-radio label="simple">配置模式</b-radio>
        <b-radio label="script">高级脚本</b-radio>
      </b-radio-group>
    </cfg-field>

    <template v-if="eventCfg.type === 'simple'">
      <b-table
        :columns="columns"
        :data="eventCfg.onEvents"
        edit-table
        draggable
        drag-handle=".handle"
        @drag-drop="handleDragDrop"
      >
        <template #handle>
          <drag-handle />
        </template>
        <template #name="{ index }">
          <b-input v-model="eventCfg.onEvents[index].name" />
        </template>
        <template #action="{ index }">
          <action-button
            type="text"
            icon="edit"
            is-icon
            tooltip="编辑"
            @click="handleEdit(index)"
          ></action-button>
          <action-button
            type="text"
            icon="minus-circle"
            color="danger"
            is-icon
            tooltip="删除"
            @click="remove(index)"
          ></action-button>
        </template>
      </b-table>
      <div class="pt-10 pb-5">
        <b-button
          icon="plus"
          dashed
          size="small"
          style="width: 100%; border-radius: 8px"
          @click="handleAdd"
        >
          新增事件
        </b-button>
      </div>
    </template>

    <cfg-field
      v-if="eventCfg.type === 'script'"
      label="脚本函数"
      tooltip="脚本函数作为高级用法，可以满足更多自定义设置"
      :labelWidth="labelWidth"
    >
      <!-- 自定义（函数） -->
      <CustomScripts
        v-model="eventCfg.customScript.funcBody"
        :arguments="eventCfg.customScript.arguments"
        style="display: inline-flex; width: auto"
        :paramsDesc="paramsDesc"
        :exampleDesc="exampleDesc"
        label=""
        funcExplain="通过提供的参数编写脚本，可以实现更灵活的表单界面控制。"
      />
    </cfg-field>

    <EventConfigModal ref="eventRef" />
  </div>
</template>

<script setup>
defineOptions({ name: 'EventsCfg' })
import { computed, ref } from 'vue'
import { useParamsDesc } from '../../hooks/useParamsDesc'
import { deepCopy } from '../../../core/utils/utils'

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

const eventCfg = computed(() => data.value.globalEvents)
const { paramsDesc, exampleDesc } = useParamsDesc()

const columns = [
  { title: ' ', slot: 'handle', width: 40, align: 'center' },
  { title: '界面事件名称', slot: 'name', minWidth: 100, tooltip: true },
  { title: ' ', slot: 'action', width: 60, align: 'center' },
]

function handleDragDrop(newList) {
  eventCfg.value.onEvents = [...newList]
}

function remove(idx) {
  eventCfg.value.onEvents.splice(idx, 1)
}

function handleAdd() {
  const obj = {
    name: '新事件名称' + eventCfg.value.onEvents.length,
    // 监听的字段及条件
    fields: [],
    // 满足执行的动作 oType = [hidden,disabled,show,enabled] // 四种操作
    actions: [],
    // 不满足执行的动作
    disActions: [],
  }
  eventRef.value?.open(obj, -1)
}

const eventRef = ref(null)

function handleEdit(index) {
  const obj = deepCopy(eventCfg.value.onEvents[index])
  eventRef.value?.open(obj, index)
}
</script>

<style scoped></style>
