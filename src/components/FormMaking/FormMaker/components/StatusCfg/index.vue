<template>
  <div class="status-container">
    <div class="mb-10">状态</div>
    <div class="status-box" v-if="hasProperty('hidden')">
      <span>隐藏</span>
      <b-switch v-model="data.config.hidden" :size="size" />
    </div>
    <div class="status-box" v-if="hasProperty('disabled')">
      <span>禁用</span>
      <b-switch v-model="data.config.disabled" :size="size" />
    </div>
    <div class="status-box" v-if="hasProperty('readonly')">
      <span>只读</span>
      <b-switch v-model="data.config.readonly" :size="size" />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'StatusCfg' })

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

// 判断是否存在options属性
function hasProperty(key) {
  return Object.keys(data.value.config).includes(key)
}
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
