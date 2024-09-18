<template>
  <label :style="{ width: config.width }">
    <b-radio-group
      v-model="model"
      :size="formConfig.size"
      :style="{ width: config.width }"
      :type="config.type"
    >
      <b-radio v-for="item in realOptions" :key="item.key" :label="item.key">
        {{ item.label }}
      </b-radio>
    </b-radio-group>
  </label>
</template>

<script setup>
import { computed } from 'vue'
import useRealOptions from '../../core/hooks/use-real-options'
defineOptions({ name: 'BFRadio' })

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  // 全局配置参数
  formConfig: {
    type: Object,
    required: true,
  },
})

const model = defineModel({ type: String, default: '' })

// config 配置项
const config = computed(() => props.data.config)

const { realOptions } = useRealOptions(config.value, props.formConfig)
</script>

<style scoped>
:deep(.bin-radio-group-button) {
  display: inline-flex;
  .bin-radio {
    position: relative;
    flex: 1;
    text-align: center;
  }
}
</style>
