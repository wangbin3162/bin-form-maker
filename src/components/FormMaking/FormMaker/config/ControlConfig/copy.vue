<template>
  <div class="comp-config-container">
    <cfg-field label="控件类型" :labelWidth="labelWidth">
      <b-tag>{{ data.name }}</b-tag>
    </cfg-field>

    <!-- 基础字段配置 -->
    <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

    <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />
  </div>
</template>

<script setup>
defineOptions({ name: 'copy' })

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
