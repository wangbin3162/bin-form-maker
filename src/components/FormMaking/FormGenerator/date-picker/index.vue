<template>
  <b-date-picker
    v-model="value"
    :format="config.format"
    :type="config.type"
    :placeholder="config.placeholder"
    :readonly="config.readonly"
    :disabled="config.disabled"
    :editable="config.editable"
    :clearable="config.clearable"
    style="width: 100%"
    @change="dateChange"
  ></b-date-picker>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
defineOptions({ name: 'BFDatePicker' })

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

const value = ref(null)

const valueMap = {
  date: 'YYYY-MM-DD',
  year: 'YYYY',
  month: 'YYYY-MM',
  datetime: 'YYYY-MM-DD HH:mm:ss',
}

watch(
  () => model.value,
  val => {
    value.value = val === '' ? '' : new Date(val)
  },
  { immediate: true },
)

// config 配置项
const config = computed(() => props.data.config)

function dateChange(val) {
  model.value = dayjs(val).format(valueMap[config.value.type])
}
</script>
