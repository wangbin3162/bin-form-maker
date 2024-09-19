<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <b-space style="margin-bottom: 16px">
        <div style="width: 80px; padding-left: 5px">显示全选</div>
        <b-switch v-model="data.config.showAll" :size="size"></b-switch>

        <div style="width: 80px; padding-left: 5px">全选位置</div>
        <b-radio-group v-model="data.config.allPosition" type="button" :size="size">
          <b-radio label="top">上方</b-radio>
          <b-radio label="first">首个</b-radio>
        </b-radio-group>
      </b-space>

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
defineOptions({ name: 'CheckboxConfig' })

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
