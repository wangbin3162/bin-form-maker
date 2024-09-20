<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <CfgField label="显示模式" :labelWidth="labelWidth">
        <b-radio-group v-model="data.config.type" type="button" :size="size" @change="typeChange">
          <b-radio label="default">默认</b-radio>
          <b-radio label="button">按钮</b-radio>
          <b-radio label="capsule">胶囊</b-radio>
        </b-radio-group>
      </CfgField>

      <CfgField label="组件宽度" :labelWidth="labelWidth" tooltip="可设置px，%">
        <b-radio-group v-model="data.config.width" type="button" :size="size">
          <b-radio label="auto">默认</b-radio>
          <b-radio label="100%" :disabled="data.config.type === 'default'">撑满</b-radio>
        </b-radio-group>
      </CfgField>

      <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />
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
defineOptions({ name: 'RadioConfig' })

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

function typeChange(type) {
  if (type === 'default') {
    data.value.config.width = 'auto'
  }
}
</script>

<style scoped></style>
