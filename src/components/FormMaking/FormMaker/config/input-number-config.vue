<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <CfgField label="组件宽度" :labelWidth="labelWidth" tooltip="可设置px，%">
        <b-input v-model="data.config.width" :size="size" clearable />
      </CfgField>

      <CfgField label="最小值" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.min" :size="size" />
      </CfgField>
      <CfgField label="最大值" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.max" :size="size" />
      </CfgField>
      <CfgField label="步长" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.step" :size="size" />
      </CfgField>
      <CfgField label="精度" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.precision" :size="size" />
      </CfgField>
      <CfgField label="按钮位置" :labelWidth="labelWidth">
        <b-radio-group v-model="data.config.btnPos" type="button" :size="size">
          <b-radio label="right">右侧</b-radio>
          <b-radio label="always">两侧</b-radio>
        </b-radio-group>
      </CfgField>
      <template v-if="data.config.type === 'right'">
        <CfgField label="上箭头图标" :labelWidth="labelWidth">
          <b-icon-select v-model="data.config.arrowUpIcon" :size="size" />
        </CfgField>
        <CfgField label="下箭头图标" :labelWidth="labelWidth">
          <b-icon-select v-model="data.config.arrowDownIcon" :size="size" />
        </CfgField>
      </template>

      <CfgField label="默认值" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.defaultValue" :size="size" />
      </CfgField>

      <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <div class="status-container">
        <div class="mb-10">操作属性</div>
        <div class="checkbox">
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
import StatusCfg from '../components/StatusCfg/index.vue'
defineOptions({ name: 'InputNumberConfig' })

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
</script>

<style scoped></style>
