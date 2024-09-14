<template>
  <div class="datasource-container">
    数据源配置
    <cfg-field label="选项来源" :labelWidth="labelWidth">
      <b-radio-group v-model="dataSource.type" type="button" :size="size">
        <b-radio label="static">静态数据</b-radio>
        <b-radio label="dynamic">动态数据</b-radio>
      </b-radio-group>
    </cfg-field>
    <!-- 静态数据编辑 -->
    <div v-if="dataSource.type === 'static'">
      <b-radio-group v-if="isSingle" v-model="data.config.defaultValue">
        <Draggable
          tag="ul"
          item-key="key"
          :list="options"
          :animation="200"
          v-bind="{
            group: { name: 'options' },
            sort: dataSource.type === 'static',
            dragClass: 'drag-item-class',
            ghostClass: 'blue-background-class',
            handle: '.drag',
          }"
          @add="handleWidgetAdd($event, widgets)"
        >
          <template #item="{ element, index }">
            <li class="mapping-item">
              <div>
                <b-radio :label="element.key"></b-radio>
              </div>
              <label>
                <b-input v-model="element.key" placeholder="选项key" :size="size" />
              </label>
              <label>
                <b-input v-model="element.label" placeholder="选项标题" :size="size" />
              </label>

              <drag-handle />
              <i class="destroy b-iconfont b-icon-delete" @click="handleRemove(index)" />
            </li>
          </template>
        </Draggable>
      </b-radio-group>

      <b-checkbox-group
        v-else
        :model-value="splitValue(data.config.defaultValue)"
        @change="multipleChage"
      >
        <Draggable
          tag="ul"
          item-key="key"
          :list="options"
          :animation="200"
          v-bind="{
            group: { name: 'options' },
            sort: dataSource.type === 'static',
            dragClass: 'drag-item-class',
            ghostClass: 'blue-background-class',
            handle: '.drag',
          }"
          @add="handleWidgetAdd($event, widgets)"
        >
          <template #item="{ element, index }">
            <li class="mapping-item">
              <div>
                <b-checkbox :label="element.key"></b-checkbox>
              </div>
              <label>
                <b-input v-model="element.key" placeholder="选项key" :size="size" />
              </label>
              <label>
                <b-input v-model="element.label" placeholder="选项标题" :size="size" />
              </label>

              <drag-handle />
              <i class="destroy b-iconfont b-icon-delete" @click="handleRemove(index)" />
            </li>
          </template>
        </Draggable>
      </b-checkbox-group>
    </div>

    <div class="mt-8 mb-8" style="padding-left: 20px">
      <b-button v-if="dataSource.type === 'static'" icon="plus" type="text" @click="handleAdd">
        新增选项
      </b-button>
      <b-button icon="retweet" type="text" @click="resetValueSelect">重置选择</b-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Draggable from 'vuedraggable'
import { splitValue, joinValue, generateId } from '../../../core/utils/utils'

defineOptions({ name: 'DatasourceCfg' })

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

const dataSource = computed(() => data.value.config.source)
const options = computed(() => data.value.config.options)

const isSingle = computed(
  () =>
    data.value.type === 'radio' || (data.value.type === 'select' && !data.value.config.multiple),
)

function handleAdd() {
  options.value.push({ key: 'option_' + generateId(), label: '新选项' })
}

function handleRemove(index) {
  options.value.splice(index, 1)
}

// 重置选择
function resetValueSelect() {
  data.value.config.defaultValue = ''
}

function multipleChage(list) {
  data.value.config.defaultValue = joinValue(list)
}
</script>

<style scoped>
.mapping-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  height: 44px;
  label {
    word-break: break-all;
    display: block;
    line-height: 1;
    flex: 1;
    font-size: 14px;
    transition: color 0.4s;
    padding-left: 4px;
  }
  :deep(.bin-radio__label) {
    display: none;
  }
  :deep(.bin-checkbox__label) {
    display: none;
  }
  .handle.drag {
    margin-left: 4px;
    flex-shrink: 0;
    transform: rotateZ(90deg);
  }
  .destroy {
    margin-left: 4px;
    width: 24px;
    font-size: 18px;
    color: #f5222d;
    transition: color 0.2s ease-out;
    cursor: pointer;
    &:hover {
      color: #f74e57;
    }
  }
}

.blue-background-class {
  position: relative;
  font-size: 0;
  border: 1px dashed var(--bin-color-primary) !important;
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff !important;
    background-image: linear-gradient(
      var(--bin-color-primary-light5),
      var(--bin-color-primary-light3),
      var(--bin-color-primary-light5)
    ) !important;
  }
}
:deep(.drag-item-class) {
  background: #fff !important;
  border: 1px solid var(--bin-color-primary) !important;
}
</style>
