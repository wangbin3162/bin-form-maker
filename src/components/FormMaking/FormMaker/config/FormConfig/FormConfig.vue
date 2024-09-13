<template>
  <div class="form-config-container">
    <div class="radio-group">
      <b-radio-group v-model="curTabActive" size="default" type="capsule">
        <b-radio v-for="item in tabs" :label="item.key" :key="item.key">
          {{ item.title }}
        </b-radio>
      </b-radio-group>
    </div>

    <div class="config-content">
      <b-scrollbar>
        <div class="comp-config-container">
          <div v-if="curTabActive === 'base'">
            <cfg-field label="标签对齐" :labelWidth="labelWidth">
              <b-radio-group v-model="data.labelPosition" type="button" :size="size">
                <b-radio label="left">左侧</b-radio>
                <b-radio label="top">顶部</b-radio>
                <b-radio label="right">右侧</b-radio>
              </b-radio-group>
            </cfg-field>

            <cfg-field label="标签宽度" :labelWidth="labelWidth">
              <b-input-number
                v-model="data.labelWidth"
                :min="60"
                :max="300"
                :step="5"
                :size="size"
                :disabled="data.labelPosition === 'top'"
              ></b-input-number>
            </cfg-field>

            <cfg-field label="标签后缀" :labelWidth="labelWidth">
              <b-input v-model="data.labelSuffix" :size="size" clearable />
            </cfg-field>

            <cfg-field label="组件尺寸" :labelWidth="labelWidth">
              <b-radio-group v-model="data.size" type="button" :size="size">
                <b-radio label="large">大号</b-radio>
                <b-radio label="default">默认</b-radio>
                <b-radio label="small">小号</b-radio>
              </b-radio-group>
            </cfg-field>
          </div>
        </div>
      </b-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineOptions({ name: 'FormConfig' })

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

const curTabActive = ref('base')

const tabs = [
  {
    title: '基础',
    key: 'base',
  },
  {
    title: '数据',
    key: 'datasouce',
  },
  {
    title: '事件',
    key: 'event',
  },
]
</script>

<style scoped>
.form-config-container {
  height: 100%;
  .radio-group {
    padding: 5px 8px;
  }

  .comp-config-container {
    padding: 0 10px;
  }
  :deep(.bin-radio-group) {
    display: flex;
    width: 100%;
  }
  :deep(.bin-radio-group-button.bin-radio-group-small .bin-radio) {
    width: 100%;
    text-align: center;
  }
  .config-content {
    height: calc(100% - 44px);
  }
}
</style>
