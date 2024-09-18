<template>
  <b-collapse-wrap collapse style="margin: 0">
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
      <template #item="{ element, index }">
        <li class="form-edit-widget-label no-put" :key="index" @click="addWidget(element)">
          <a>
            <b-icon :name="element.icon" />
            <span class="field-name">{{ element.name }}</span>
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

defineProps({
  title: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: () => [],
  },
})

const { addWidget } = useMakerStore()

function buildCompCfg(item) {
  return createComponent(item.type)
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
    cursor: move;
    background: #f6f7ff;
    color: rgba(0, 0, 0, 0.65);
    width: 100%;
    height: 100%;
    padding-left: 6px;
    .icon {
      width: 20px;
    }
    .field-name {
      margin-left: 4px;
      width: 72px;
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &.disabled {
    cursor: not-allowed;
    & > a {
      cursor: not-allowed;
      border: 1px solid #d4d4d4;
      background-color: #d4d4d4;
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
