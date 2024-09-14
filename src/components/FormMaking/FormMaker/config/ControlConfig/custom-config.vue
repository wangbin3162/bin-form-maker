<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <cfg-field label="控件类型" :labelWidth="labelWidth">
        <b-tag>{{ data.name }}</b-tag>
      </cfg-field>

      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <cfg-field
        label="组件名称"
        tooltip="自定义组件名称，支持动态插槽插入，在根组件使用 #custom-[当前名称]来进行插入"
        :labelWidth="labelWidth"
      >
        <b-input v-model="data.config.compName" :size="size" clearable />
      </cfg-field>

      <cfg-field label="默认值" :labelWidth="labelWidth">
        <b-input v-model="data.config.defaultValue" :size="size" clearable />
      </cfg-field>

      <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />
    </div>

    <div v-if="tab === 'validate'">
      <ValidateCfg v-model="data" :labelWidth="labelWidth" :size="size" />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'CustomConfig' })

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
