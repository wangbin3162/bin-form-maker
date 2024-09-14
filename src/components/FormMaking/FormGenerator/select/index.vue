<template>
  <b-select v-model="value" v-bind="config" @change="handleInputMultiple">
    <b-option
      v-for="item in config.options"
      :key="item.key"
      :value="item.key"
      :label="item.label"
    ></b-option>
  </b-select>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { splitValue, joinValue } from '../../core/utils/utils'
defineOptions({ name: 'BFSelect' })

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

const value = ref(null)

watch(
  () => model.value,
  val => {
    value.value = config.value.multiple ? splitValue(val) : val
  },
  { immediate: true },
)

// 触发多选input函数
function handleInputMultiple(val) {
  model.value = config.value.multiple ? joinValue(val) : val
}
</script>
