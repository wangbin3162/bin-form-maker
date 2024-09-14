<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <cfg-field label="控件类型" :labelWidth="labelWidth">
        <b-tag>{{ data.name }}</b-tag>
      </cfg-field>

      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <cfg-field label="组件宽度" :labelWidth="labelWidth" tooltip="可设置px，%">
        <b-input v-model="data.config.width" :size="size" clearable />
      </cfg-field>

      <cfg-field label="最小值" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.min" :size="size" />
      </cfg-field>
      <cfg-field label="最大值" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.max" :size="size" />
      </cfg-field>
      <cfg-field label="步长" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.step" :size="size" />
      </cfg-field>
      <cfg-field label="精度" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.precision" :size="size" />
      </cfg-field>
      <cfg-field label="按钮位置" :labelWidth="labelWidth">
        <b-radio-group v-model="data.config.btnPos" type="button" :size="size">
          <b-radio label="right">右侧</b-radio>
          <b-radio label="always">两侧</b-radio>
        </b-radio-group>
      </cfg-field>
      <template v-if="data.config.type === 'right'">
        <cfg-field label="上箭头图标" :labelWidth="labelWidth">
          <b-icon-select v-model="data.config.arrowUpIcon" :size="size" />
        </cfg-field>
        <cfg-field label="下箭头图标" :labelWidth="labelWidth">
          <b-icon-select v-model="data.config.arrowDownIcon" :size="size" />
        </cfg-field>
      </template>

      <cfg-field label="默认值" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.defaultValue" :size="size" />
      </cfg-field>

      <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <div class="status-container">
        <div class="mb-10">操作属性</div>
        <div class="checkbox">
          <b-checkbox v-model="data.config.editable">是否可输入</b-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
