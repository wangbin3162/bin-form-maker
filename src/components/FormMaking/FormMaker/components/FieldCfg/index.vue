<template>
  <div>
    <CfgField label="控件类型" :labelWidth="labelWidth">
      <b-space>
        <b-tag>{{ data.name }}</b-tag>
        <b-dropdown @command="changeType">
          <b-icon name="down-square" size="18" type="button" title="切换控件"></b-icon>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item
                v-for="t in basicComponents"
                :key="t.type"
                :selected="data.type === t.type"
                :name="t.type"
              >
                {{ t.name }}
              </b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
      </b-space>

      <b-popover
        v-if="modelDataDtos.length > 0"
        placement="bottom-end"
        width="300px"
        v-model:visible="fillVisible"
      >
        <b-button icon="highlight" type="text">填充字段</b-button>
        <template #content>
          <div style="padding: 4px 0 0; max-height: 500px; overflow-y: auto">
            <b-tree
              :data="modelDataDtos"
              :render="renderContent"
              children-key="fields"
              title-ellipsis
              :lock-select="true"
            ></b-tree>
          </div>
        </template>
      </b-popover>
    </CfgField>
    <b-form ref="formRef" :model="data" :labelWidth="labelWidth" :size="size" label-position="left">
      <b-form-item
        label="字段标识"
        prop="model"
        :labelWidth="labelWidth"
        :rules="{
          required: true,
          message: '字段标识不能为空',
          trigger: 'blur',
        }"
        style="margin-bottom: 16px"
      >
        <template #label>
          <span style="color: rgba(0, 0, 0, 0.65)" class="over-hidden">字段标识</span>
        </template>

        <b-input v-model="data.model" :size="size" clearable placeholder="字段名称，必填" />
      </b-form-item>
    </b-form>
    <CfgField label="字段标题" :labelWidth="labelWidth">
      <b-input v-model="data.label" :size="size" clearable placeholder="字段的标题" />
    </CfgField>

    <CfgField
      label="提示说明"
      tooltip="字段的一些提示内容，会在标签后增加一个提示。"
      :labelWidth="labelWidth"
      style="padding-bottom: 16px"
    >
      <b-input v-model="data.config.tooltip" :size="size" clearable placeholder="请输入" />
    </CfgField>
  </div>
</template>

<script setup>
defineOptions({ name: 'FieldCfg' })
import useMakerStore from '../../hooks/useMakerStore'
import { basicComponents } from '../../../core/config/component-list'
import { createComponent } from '../../../core/config/component-cfg'
import { deepCopy } from '../../../core/utils/utils'
import CfgField from '../Gui/CfgField.vue'
import { h, ref } from 'vue'

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

const { modelDataDtos, changeWidget } = useMakerStore()

function changeType(type) {
  const com = createComponent(type, '', false)
  data.value.type = type
  data.value.name = com.name
  data.value.config = deepCopy(com.config)
  data.value.rules = []

  changeWidget(data.value)
}

const fillVisible = ref(false)
function renderContent({ data }) {
  const title = data.isLeaf ? `${data.fieldDesc}(${data.fieldName})` : data.storageDesc
  const inline = [
    h(
      'span',
      {
        class: 't-ellipsis',
        style: { width: 'calc(100% - 24px)' },
        title,
        onClick: () => {
          if (data.isLeaf) fillField(data)
        },
      },
      [
        h('i', {
          class: ['b-iconfont', `b-icon-${data.icon}`],
          style: { marginRight: '4px' },
        }),
        title,
      ],
    ),
  ]
  return h('span', { style: { width: '100%', fontSize: '12px' }, flex: 'main:justify' }, inline)
}

function fillField(item) {
  // console.log('item ========>', item)
  data.value.model = item.fieldName
  data.value.label = item.fieldDesc
  fillVisible.value = false
}
</script>

<style scoped>
:deep(.bin-form-item.is-required) {
  .bin-form-item__label {
    position: relative;
    padding-left: 5px;
    &::before {
      display: none;
    }
  }
  .bin-form-item__error {
    padding-top: 2px;
  }
}
</style>
