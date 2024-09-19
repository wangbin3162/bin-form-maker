<template>
  <b-modal
    v-model="visible"
    :title="`界面事件${currentIndex === -1 ? '新增' : '编辑'}: ${currentObj?.name || ''}`"
    width="1280px"
    top="50px"
    :body-styles="{ padding: 0 }"
    :mask-closable="false"
  >
    <b-layout has-sider style="height: 520px">
      <template #sider>
        <div class="title">字段列表</div>
        <b-empty v-if="realFieldWedgits.length === 0">面板暂无字段控件</b-empty>
        <ul v-else>
          <li
            class="form-edit-widget-label no-put"
            v-for="element in realFieldWedgits"
            :key="element.model"
            draggable="true"
            @dragstart="dragStart($event, element)"
            @dragend="dragEnd"
          >
            <a>
              <span class="field-name">{{ element.label }}</span>
            </a>
          </li>
        </ul>
      </template>
      <div class="right-box">
        <div class="right-top">
          <div class="title">规则条件</div>
          <div class="p8">
            <b-table
              :columns="columns"
              :data="currentObj.fields"
              edit-table
              draggable
              max-height="192"
              drag-handle=".handle"
              @drag-drop="handleDragDrop"
            >
              <template #handle>
                <drag-handle />
              </template>
              <template #fieldName="{ index }">
                <div style="padding: 0 8px">
                  <b-tag :title="currentObj.fields[index].fieldName">
                    {{ currentObj.fields[index].fieldTitle }}
                  </b-tag>
                </div>
              </template>
              <template #compare="{ index }">
                <b-select v-model="currentObj.fields[index].compare" clearable>
                  <b-option
                    v-for="(val, key) in currentObj.fields[index].type === 'input-number'
                      ? COMPARE_NUM
                      : COMPARE"
                    :key="key"
                    :value="key"
                    :label="val"
                  >
                    {{ val }}
                  </b-option>
                </b-select>
              </template>
              <template #value="{ index }">
                <b-input-number
                  v-if="currentObj.fields[index].type === 'input-number'"
                  v-model="currentObj.fields[index].value"
                />
                <b-input v-else v-model="currentObj.fields[index].value" />
              </template>
              <template #action="{ index }">
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
          </div>
          <Transition name="fade-in">
            <div class="top-mask" v-if="dragging" @dragover.prevent @drop="fieldDrop">
              <span>可放置此处增加规则条件</span>
            </div>
          </Transition>
        </div>
        <div class="right-half">
          <div class="title">满足动作</div>
          <div class="p8">
            <b-table
              :columns="columns2"
              :data="currentObj.actions"
              edit-table
              draggable
              drag-handle=".handle"
              @drag-drop="handleActionsDragDrop"
              max-height="192"
            >
              <template #handle>
                <drag-handle />
              </template>
              <template #fieldName="{ index }">
                <div style="padding: 0 8px">
                  <b-tag :title="currentObj.actions[index].fieldName">
                    {{ currentObj.actions[index].fieldTitle }}
                  </b-tag>
                </div>
              </template>
              <template #oType="{ index }">
                <b-select v-model="currentObj.actions[index].oType" clearable>
                  <b-option v-for="(val, key) in OTYPE" :key="key" :value="key" :label="val">
                    {{ val }}
                  </b-option>
                </b-select>
              </template>
              <template #action="{ index }">
                <action-button
                  type="text"
                  icon="minus-circle"
                  color="danger"
                  is-icon
                  tooltip="删除"
                  @click="removeActions(index)"
                ></action-button>
              </template>
            </b-table>
          </div>
          <Transition name="fade-in">
            <div class="top-mask" v-if="dragging" @dragover.prevent @drop="actionDrop">
              <span>可放置此处增加满足动作</span>
            </div>
          </Transition>
        </div>
        <div class="right-half">
          <div class="title">不满足动作</div>
          <div class="p8">
            <b-table
              :columns="columns2"
              :data="currentObj.disActions"
              edit-table
              draggable
              drag-handle=".handle"
              @drag-drop="handleDisActionsDragDrop"
              max-height="192"
            >
              <template #handle>
                <drag-handle />
              </template>
              <template #fieldName="{ index }">
                <div style="padding: 0 8px">
                  <b-tag :title="currentObj.disActions[index].fieldName">
                    {{ currentObj.disActions[index].fieldTitle }}
                  </b-tag>
                </div>
              </template>
              <template #oType="{ index }">
                <b-select v-model="currentObj.disActions[index].oType" clearable>
                  <b-option v-for="(val, key) in OTYPE" :key="key" :value="key" :label="val">
                    {{ val }}
                  </b-option>
                </b-select>
              </template>
              <template #action="{ index }">
                <action-button
                  type="text"
                  icon="minus-circle"
                  color="danger"
                  is-icon
                  tooltip="删除"
                  @click="removeDisActions(index)"
                ></action-button>
              </template>
            </b-table>
          </div>
          <Transition name="fade-in">
            <div class="top-mask" v-if="dragging" @dragover.prevent @drop="disActionDrop">
              <span>可放置此处增加不满足动作</span>
            </div>
          </Transition>
        </div>
      </div>
    </b-layout>
    <template #footer>
      <b-button @click="visible = false">取消</b-button>
      <b-button type="primary" @click="handleSave">确定</b-button>
    </template>
  </b-modal>
</template>

<script setup>
defineOptions({ name: 'EventConfigModal' })
import { Message } from 'bin-ui-design'
import useMakerStore from '../../hooks/useMakerStore'
import { COMPARE, COMPARE_NUM, OTYPE } from './events-enum'
import { ref, computed } from 'vue'

const visible = ref(false)

const currentIndex = ref(-1)
const currentObj = ref({})

const { realFieldWedgits, formConfig } = useMakerStore()

const eventList = computed(() => formConfig.value.globalEvents.onEvents)
const dragging = ref(false)

function open(obj, index) {
  currentIndex.value = index
  currentObj.value = obj
  visible.value = true
}

function handleSave() {
  if (currentIndex.value === -1) {
    eventList.value.push(currentObj.value)
  } else {
    eventList.value.splice(currentIndex.value, 1, currentObj.value)
  }
  visible.value = false
}

const columns = [
  { title: ' ', slot: 'handle', width: 40, align: 'center' },
  { title: '字段标识', slot: 'fieldName', minWidth: 100, tooltip: true },
  { title: '匹配条件', slot: 'compare', minWidth: 100, tooltip: true },
  { title: '匹配值', slot: 'value', minWidth: 100, tooltip: true },
  { title: ' ', slot: 'action', width: 40, align: 'center' },
]

const columns2 = [
  { title: ' ', slot: 'handle', width: 40, align: 'center' },
  { title: '字段标识', slot: 'fieldName', minWidth: 100, tooltip: true },
  { title: '执行动作', slot: 'oType', minWidth: 100, tooltip: true },
  { title: ' ', slot: 'action', width: 40, align: 'center' },
]

defineExpose({
  open,
})

function dragEnd() {
  dragging.value = false
}

function dragStart(ev, item) {
  ev.dataTransfer.setData('Field', JSON.stringify(item))
  console.log(item)
  dragging.value = true
}

// 字段规则放置事件
function fieldDrop(ev) {
  ev.preventDefault()
  let json = ev.dataTransfer.getData('Field')
  const field = JSON.parse(json)
  // 判断是否已经有字段标识，如没有则增加一个
  if (currentObj.value.fields.findIndex(i => i.fieldName === field.model) > -1) {
    Message.warning('已存在字段，无需重复设置')
    return
  }
  currentObj.value.fields.push({
    fieldName: field.model,
    fieldTitle: field.label,
    compare: '',
    value: field.type === 'input-number' ? null : '',
    type: field.type,
  })
}

function actionDrop(ev) {
  ev.preventDefault()
  let json = ev.dataTransfer.getData('Field')
  const field = JSON.parse(json)
  currentObj.value.actions.push({
    fieldName: field.model,
    fieldTitle: field.label,
    oType: '',
  })
}

function disActionDrop(ev) {
  ev.preventDefault()
  let json = ev.dataTransfer.getData('Field')
  const field = JSON.parse(json)
  currentObj.value.disActions.push({
    fieldName: field.model,
    fieldTitle: field.label,
    oType: '',
  })
}

function handleDragDrop(newList) {
  currentObj.value.fields = [...newList]
}

function handleActionsDragDrop(newList) {
  currentObj.value.actions = [...newList]
}

function handleDisActionsDragDrop(newList) {
  currentObj.value.disActions = [...newList]
}

function remove(idx) {
  currentObj.value.fields.splice(idx, 1)
}

function removeActions(idx) {
  currentObj.value.actions.splice(idx, 1)
}

function removeDisActions(idx) {
  currentObj.value.disActions.splice(idx, 1)
}
</script>

<style scoped>
:deep(.bin-layout-sider) {
  .sider-inner {
    height: 100%;
    overflow-y: auto;
  }
}
:deep(.bin-layout-content) {
  height: 100%;
  overflow-y: auto;
}

.right-box {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  .right-top {
    position: relative;
    width: 100%;
    height: 50%;
    border-bottom: 1px solid var(--bin-border-color-base);
  }
  .right-half {
    position: relative;
    width: 50%;
    height: 50%;
    &:last-child {
      border-left: 1px solid var(--bin-border-color-base);
    }
  }
  .top-mask {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(45, 140, 240, 0.15);
    > span {
      display: none;
      background-color: #fff;
      padding: 8px;
      border-radius: 4px;
      opacity: 0.5;
    }
  }
}
.title {
  padding: 0 16px;
  line-height: 34px;
  border-bottom: 1px solid var(--bin-border-color-base);
}
ul {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  padding: 10px 10px 10px;
  margin: 0;
}
.form-edit-widget-label {
  font-size: 12px;
  width: 46%;
  height: 28px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2%;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #f6f7ff;
  &:hover {
    border: 1px dashed var(--bin-color-primary);
    a {
      color: var(--bin-color-primary);
    }
  }

  & > a {
    display: inline-flex;
    align-items: center;
    cursor: grab;
    background: #f6f7ff;
    color: rgba(0, 0, 0, 0.65);
    width: 100%;
    height: 100%;
    padding: 0 6px;
    position: relative;
    .icon {
      width: 20px;
    }
    .field-name {
      margin-left: 4px;
      flex: auto;
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.required {
      &::before {
        position: absolute;
        top: 4px;
        left: 3px;
        content: '*';
        font-size: 16px;
        color: var(--bin-color-danger);
      }
    }
  }

  &.disabled {
    cursor: not-allowed;
    & > a {
      cursor: not-allowed;
      opacity: 0.7;
      border: 1px solid #fafafa;
      background-color: #fafafa;
    }
    &:hover {
      border-color: transparent;
      a {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>
