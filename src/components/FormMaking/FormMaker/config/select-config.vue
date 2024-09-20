<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <CfgField label="占位内容" :labelWidth="labelWidth">
        <b-input v-model="data.config.placeholder" :size="size" clearable />
      </CfgField>
      <div flex="cross:center box:mean">
        <CfgField label="多选配置" :labelWidth="labelWidth">
          <b-switch v-model="data.config.multiple" :size="size"></b-switch>
        </CfgField>

        <CfgField v-if="data.config.multiple" label="多选折叠" :labelWidth="labelWidth">
          <b-switch v-model="data.config.collapseTags" :size="size"></b-switch>
        </CfgField>
      </div>
      <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <div class="status-container">
        <div class="mb-10">操作属性</div>
        <div class="checkbox">
          <b-checkbox v-model="data.config.clearable">显示清除按钮</b-checkbox>
          <b-checkbox v-model="data.config.filterable">可搜索</b-checkbox>
        </div>
      </div>
    </div>

    <div v-if="tab === 'options'">
      <DatasourceCfg v-model="data" :labelWidth="labelWidth" :size="size" />
    </div>
    <div v-if="tab === 'validate'">
      <ValidateCfg v-model="data" :labelWidth="labelWidth" :size="size" />
    </div>
  </div>
</template>

<script setup>
import CfgField from '../components/Gui/CfgField.vue'
import FieldCfg from '../components/FieldCfg/index.vue'
import DatasourceCfg from '../components/DatasourceCfg/index.vue'
import ValidateCfg from '../components/ValidateCfg/index.vue'
import StatusCfg from '../components/StatusCfg/index.vue'
defineOptions({ name: 'SelectConfig' })

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
