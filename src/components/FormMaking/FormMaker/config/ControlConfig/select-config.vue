<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <cfg-field label="控件类型" :labelWidth="labelWidth">
        <b-tag>{{ data.name }}</b-tag>
      </cfg-field>

      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <cfg-field label="占位内容" :labelWidth="labelWidth">
        <b-input v-model="data.config.placeholder" :size="size" clearable />
      </cfg-field>
      <div flex="cross:center box:mean">
        <cfg-field label="多选配置" :labelWidth="labelWidth">
          <b-switch v-model="data.config.multiple" :size="size"></b-switch>
        </cfg-field>

        <cfg-field v-if="data.config.multiple" label="多选折叠" :labelWidth="labelWidth">
          <b-switch v-model="data.config.collapseTags" :size="size"></b-switch>
        </cfg-field>
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
  </div>
</template>

<script setup>
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
