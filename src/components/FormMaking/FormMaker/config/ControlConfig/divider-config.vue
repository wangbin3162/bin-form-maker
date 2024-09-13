<template>
  <div class="comp-config-container">
    <cfg-field label="控件类型" :labelWidth="labelWidth">
      <b-tag>{{ data.name }}</b-tag>
    </cfg-field>

    <cfg-field label="标题" :labelWidth="labelWidth">
      <b-input v-model="data.label" :size="size" clearable />
    </cfg-field>

    <cfg-field label="标题位置" :labelWidth="labelWidth">
      <b-radio-group v-model="data.config.align" type="button" :size="size">
        <b-radio label="left">左侧</b-radio>
        <b-radio label="center">顶部</b-radio>
        <b-radio label="right">右侧</b-radio>
      </b-radio-group>
    </cfg-field>

    <cfg-field label="组件样式" :labelWidth="labelWidth">
      <b-input v-model="data.config.margin" size="small" placeholder="编写CSS属性" />
    </cfg-field>

    <div class="status-container">
      <div class="mb-16">操作属性</div>
      <div class="checkbox">
        <b-checkbox v-model="data.config.dashed">虚线显示</b-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'DividerConfig' })

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
