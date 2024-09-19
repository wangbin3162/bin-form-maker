<template>
  <b-collapse-wrap collapse style="margin: 0 0 1px">
    <template #title>
      <span class="title">{{ title }}</span>
    </template>

    <draggable
      tag="ul"
      :list="list"
      item-key="type"
      v-bind="{
        group: { name: 'form', pull: 'clone', put: false },
        sort: false,
        ghostClass: 'ghost',
      }"
      filter=".disabled"
      :clone="buildCompCfg"
    >
      <template #item="{ element }">
        <li
          class="form-edit-widget-label no-put"
          :class="{
            disabled: alreadyInFieldModels.includes(element.fieldName),
          }"
          @click="addOne(element)"
        >
          <a v-if="!isField">
            <b-icon :name="element.icon" />
            <span class="field-name">{{ element.name }}</span>
          </a>
          <a v-else :class="{ required: element.required }">
            <span class="field-name">{{ element.fieldTitle }}asdfasdfas</span>
          </a>
        </li>
      </template>
    </draggable>
  </b-collapse-wrap>
</template>

<script setup>
import Draggable from 'vuedraggable'
import useMakerStore from '../../hooks/useMakerStore'
import { createComponent } from '../../../core/config/component-cfg'
defineOptions({ name: 'CompList' })

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: () => [],
  },
  // 是否是自定义的控件
  isCustom: {
    type: Boolean,
    default: false,
  },
  // 是否是实际字段
  isField: {
    type: Boolean,
    default: false,
  },
})

const { addWidget, alreadyInFieldModels, formatFieldComp } = useMakerStore()

// 点击增加事件
function addOne(ele) {
  const com = props.isField
    ? formatFieldComp(ele)
    : createComponent(ele.type, ele.name, props.isCustom)
  addWidget(com)
}

function buildCompCfg(item) {
  // console.log(item)
  if (props.isField) return formatFieldComp(item)
  return createComponent(item.type, item.name, props.isCustom)
}
</script>

<style scoped>
.widget-cate {
  padding: 8px 12px;
  font-size: 13px;
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
