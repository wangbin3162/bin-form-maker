<template>
  <div class="form-config-container">
    <div class="radio-group" v-if="!isLayouts(data.type)">
      <b-radio-group v-model="curTabActive" size="default" type="capsule">
        <b-radio v-for="item in tabs" :label="item.key" :key="item.key">
          {{ item.title }}
        </b-radio>
      </b-radio-group>
    </div>

    <div class="config-content">
      <b-scrollbar>
        <component :is="`${data.type}-config`" v-model="data" :tab="curTabActive" />
      </b-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { isOptionsCtrl, isLayouts } from '../../../core/config/component-list'
import { ref, watch } from 'vue'
defineOptions({ name: 'WidgetConfig' })

const data = defineModel({ type: Object })

defineProps({
  size: {
    type: String,
    default: 'small',
  },
})

const curTabActive = ref('base')

const tabs = ref([])

watch(
  () => data.value.key,
  () => {
    curTabActive.value = 'base'

    tabs.value = isOptionsCtrl(data.value.type)
      ? [
          {
            title: '基础',
            key: 'base',
          },
          {
            title: '选项',
            key: 'options',
          },
          {
            title: '验证',
            key: 'validate',
          },
        ]
      : [
          {
            title: '基础',
            key: 'base',
          },
          {
            title: '验证',
            key: 'validate',
          },
        ]
  },
  { immediate: true },
)
</script>

<style scoped>
.form-config-container {
  height: 100%;
  .radio-group {
    padding: 5px 8px;
  }
  :deep(.bin-radio-group) {
    display: flex;
    /* width: 100%; */
  }
  :deep(.bin-radio-group-button.bin-radio-group-small .bin-radio) {
    /* width: 100%; */
    text-align: center;
  }

  :deep(.bin-icon-select) {
    .select-trigger .bin-button {
      height: var(--bin-small-height);
      line-height: var(--bin-small-height-2);
    }
  }

  .config-content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
}
</style>
