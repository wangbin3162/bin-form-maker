<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <cfg-field label="控件类型" :labelWidth="labelWidth">
        <b-tag>{{ data.name }}</b-tag>
      </cfg-field>

      <b-form
        ref="formRef"
        :model="data"
        :labelWidth="labelWidth"
        :size="size"
        label-position="left"
      >
        <b-form-item
          label="字段标识"
          prop="model"
          :labelWidth="labelWidth"
          :rules="{
            required: true,
            message: '字段标识不能为空',
            trigger: 'blur',
          }"
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
      <cfg-field label="输入类型" :labelWidth="labelWidth">
        <b-radio-group v-model="data.config.type" type="button" :size="size">
          <b-radio label="text">文本</b-radio>
          <b-radio label="password">密码</b-radio>
        </b-radio-group>
      </cfg-field>
      <cfg-field label="占位内容" :labelWidth="labelWidth">
        <b-input v-model="data.config.placeholder" :size="size" clearable />
      </cfg-field>
      <cfg-field label="提示说明" :labelWidth="labelWidth">
        <b-input v-model="data.config.tooltip" :size="size" clearable />
      </cfg-field>
      <cfg-field label="最大长度" :labelWidth="labelWidth">
        <b-input-number v-model="data.config.maxlength" :size="size" :min="0" :precision="0" />
      </cfg-field>
      <cfg-field label="默认值" :labelWidth="labelWidth">
        <b-input v-model="data.config.defaultValue" :size="size" clearable />
      </cfg-field>

      <div class="status-container">
        <div class="mb-16">状态</div>
        <div class="status-box">
          <span>隐藏</span>
          <b-switch v-model="data.config.hidden" :size="size" />
        </div>
        <div class="status-box">
          <span>禁用</span>
          <b-switch v-model="data.config.disabled" :size="size" />
        </div>
      </div>

      <div class="status-container">
        <div class="mb-16">操作属性</div>
        <div class="checkbox">
          <b-checkbox v-model="data.config.clearable">显示清除按钮</b-checkbox>
        </div>
      </div>
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
