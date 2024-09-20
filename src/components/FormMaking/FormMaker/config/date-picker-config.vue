<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <CfgField label="显示类型" :labelWidth="labelWidth">
        <b-radio-group
          v-model="data.config.type"
          :size="size"
          type="button"
          @change="handleChangeRadio"
        >
          <b-radio label="year">年</b-radio>
          <b-radio label="month">月</b-radio>
          <b-radio label="date">日期</b-radio>
          <b-radio label="datetime">日期时间</b-radio>
        </b-radio-group>
      </CfgField>

      <CfgField
        label="显示格式"
        tooltip="仅用于显示格式，实际存储格式根据类型判定"
        :labelWidth="labelWidth"
      >
        <b-input v-model="data.config.format" :size="size"></b-input>
      </CfgField>

      <CfgField label="占位内容" :labelWidth="labelWidth">
        <b-input v-model="data.config.placeholder" :size="size" clearable />
      </CfgField>

      <CfgField label="默认值" :labelWidth="labelWidth">
        <b-date-picker
          :size="size"
          v-model="data.config.defaultValue"
          :type="data.config.type"
        ></b-date-picker>
      </CfgField>

      <div class="status-container">
        <div class="mb-10">操作属性</div>
        <div class="checkbox">
          <b-checkbox v-model="data.config.clearable">显示清除按钮</b-checkbox>
          <b-checkbox v-model="data.config.editable">是否可输入</b-checkbox>
        </div>
      </div>
    </div>
    <div v-if="tab === 'validate'">
      <ValidateCfg v-model="data" :labelWidth="labelWidth" :size="size" />
    </div>
  </div>
</template>

<script setup>
import CfgField from '../components/Gui/CfgField.vue'
import FieldCfg from '../components/FieldCfg/index.vue'
import ValidateCfg from '../components/ValidateCfg/index.vue'
defineOptions({ name: 'DatePickerConfig' })

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
  tab: {
    type: String,
    default: 'base',
  },
})

function handleChangeRadio(val) {
  if (val === 'datetime') {
    data.value.config.format = 'YYYY-MM-DD HH:mm:ss'
  }
  if (val === 'date') {
    data.value.config.format = 'YYYY-MM-DD'
  }
  if (val === 'year') {
    data.value.config.format = 'YYYY'
  }
  if (val === 'month') {
    data.value.config.format = 'YYYY-MM'
  }
}
</script>

<style scoped></style>
