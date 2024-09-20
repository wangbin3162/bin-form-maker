<template>
  <div class="comp-config-container">
    <CfgField label="控件类型" :labelWidth="labelWidth">
      <b-tag>{{ data.name }}</b-tag>
    </CfgField>
    <CfgField label="容器标题" :labelWidth="labelWidth">
      <b-input v-model="data.config.title.text" :size="size" clearable />
    </CfgField>
    <CfgField label="标题字号" :labelWidth="labelWidth">
      <b-space>
        <b-input-number
          v-model="data.config.title.fontSize"
          :min="12"
          :step="2"
          :max="24"
          :size="size"
        />

        <b-radio-group v-model="data.config.title.fontSize" :size="size" type="button">
          <b-radio :label="12">12</b-radio>
          <b-radio :label="16">16</b-radio>
          <b-radio :label="18">18</b-radio>
        </b-radio-group>
      </b-space>
    </CfgField>
    <CfgField label="标题图标" :labelWidth="labelWidth">
      <b-icon-select v-model="data.config.title.icon" :size="size" />
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

    <CfgField label="可收起">
      <b-switch v-model="data.config.collapse" :size="size" />
    </CfgField>
  </div>
</template>

<script setup>
import CfgField from '../components/Gui/CfgField.vue'
defineOptions({ name: 'GroupContainerConfig' })

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
</script>

<style scoped></style>
