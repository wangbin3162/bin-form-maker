<template>
  <div @click="showDebug">
    <slot>
      <b-button @click="showDebug" type="text" text-color="danger">
        <b-icon name="bug" size="18"></b-icon>
      </b-button>
    </slot>
    <b-modal
      :title="title"
      append-to-body
      v-model="debugVisible"
      :width="width"
      @opened="showEditor"
      screen-center
    >
      <b-skeleton :loading="!render" animation :rows="10">
        <b-ace-editor :model-value="debugStr" readonly :height="height" />
      </b-skeleton>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineOptions({ name: 'DebugModal' })

const props = defineProps({
  data: {
    type: [Object, Array],
  },
  title: {
    type: String,
    default: '查看json',
  },
  width: {
    type: String,
    default: '600px',
  },
  height: {
    type: String,
    default: '400px',
  },
})

const debugStr = ref('')
const debugVisible = ref(false)
const render = ref(false)
function showDebug() {
  render.value = false
  debugStr.value = JSON.stringify(props.data, null, 2)
  debugVisible.value = true
}
function showEditor() {
  render.value = true
}

function show(data) {
  render.value = false
  debugStr.value = JSON.stringify(data, null, 2)

  debugVisible.value = true
}

defineExpose({ show })
</script>
