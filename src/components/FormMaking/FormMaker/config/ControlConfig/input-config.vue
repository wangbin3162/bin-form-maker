<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <cfg-field label="输入类型" :labelWidth="labelWidth">
        <b-radio-group v-model="data.config.type" type="button" :size="size">
          <b-radio label="text">文本</b-radio>
          <b-radio label="password">密码</b-radio>
        </b-radio-group>
      </cfg-field>
      <cfg-field label="占位内容" :labelWidth="labelWidth">
        <b-input v-model="data.config.placeholder" :size="size" clearable />
      </cfg-field>
      <cfg-field label="最大长度" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.maxlength" :size="size" :min="0" :precision="0" />
      </cfg-field>
      <cfg-field label="默认值" :labelWidth="labelWidth">
        <b-input v-model="data.config.defaultValue" :size="size" clearable />
      </cfg-field>

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
