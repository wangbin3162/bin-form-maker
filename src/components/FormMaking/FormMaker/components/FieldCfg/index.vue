<template>
  <div>
    <b-form ref="formRef" :model="data" :labelWidth="labelWidth" :size="size" label-position="left">
      <b-form-item
        label="字段标识"
        prop="model"
        :labelWidth="labelWidth"
        :rules="{
          required: true,
          message: '字段标识不能为空',
          trigger: 'blur',
        }"
        style="margin-bottom: 16px"
      >
        <template #label>
          <span style="color: rgba(0, 0, 0, 0.65)" class="over-hidden">字段标识</span>
        </template>

        <b-input v-model="data.model" :size="size" clearable />
      </b-form-item>
    </b-form>
    <cfg-field label="字段标题" :labelWidth="labelWidth">
      <b-input v-model="data.label" :size="size" clearable />
    </cfg-field>

    <cfg-field
      label="提示说明"
      tooltip="字段的一些提示内容，会在标签后增加一个问好提示。"
      :labelWidth="labelWidth"
      style="padding-bottom: 16px"
    >
      <b-input v-model="data.config.tooltip" :size="size" clearable />
    </cfg-field>
  </div>
</template>

<script setup>
defineOptions({ name: 'FieldCfg' })

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

<style scoped>
:deep(.bin-form-item.is-required) {
  .bin-form-item__label {
    position: relative;
    padding-left: 5px;
    &::before {
      display: none;
    }
  }
  .bin-form-item__error {
    padding-top: 2px;
  }
}
</style>
