<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />
      <CfgField
        label="组件名称"
        tooltip="自定义组件名称，支持动态插槽插入，在根组件使用 #custom-[当前名称]来进行插入"
        :labelWidth="labelWidth"
      >
        <b-input v-model="data.config.compName" :size="size" disabled />
      </CfgField>

      <CfgField label="默认值" :labelWidth="labelWidth">
        <b-input v-model="data.config.defaultValue" :size="size" clearable />
      </CfgField>

      <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />
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
defineOptions({ name: 'CustomComponentConfig' })

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
