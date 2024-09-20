<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <CfgField label="输入类型" :labelWidth="labelWidth">
        <b-radio-group v-model="data.config.type" type="button" :size="size">
          <b-radio label="text">文本</b-radio>
          <b-radio label="password">密码</b-radio>
        </b-radio-group>
      </CfgField>
      <CfgField label="占位内容" :labelWidth="labelWidth">
        <b-input v-model="data.config.placeholder" :size="size" clearable />
      </CfgField>
      <CfgField label="最大长度" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.maxlength" :size="size" :min="0" :precision="0" />
      </CfgField>
      <CfgField label="默认值" :labelWidth="labelWidth">
        <b-input v-model="data.config.defaultValue" :size="size" clearable />
      </CfgField>

      <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <div class="status-container">
        <div class="mb-10">操作属性</div>
        <div class="checkbox">
          <b-checkbox v-model="data.config.clearable">显示清除按钮</b-checkbox>
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
defineOptions({ name: 'InputConfig' })

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
