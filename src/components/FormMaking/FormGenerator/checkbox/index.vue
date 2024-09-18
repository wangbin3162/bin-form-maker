<template>
  <div class="bf-checkbox" :class="config.showAll ? 'show-all ' + config.allPosition : ''">
    <div v-if="config.showAll" class="all-check" :class="config.allPosition">
      <b-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
        全选
      </b-checkbox>
    </div>

    <b-checkbox-group
      v-model="realValue"
      :size="formConfig.size"
      :disabled="config.disabled"
      @change="handleCheckBox"
    >
      <b-checkbox
        v-for="item in realOptions"
        :key="item.key"
        :label="item.key"
        :style="{ width: config.itemWidth }"
      >
        {{ item.label }}
      </b-checkbox>
    </b-checkbox-group>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { splitValue, joinValue } from '../../core/utils/utils'
import useRealOptions from '../../core/hooks/use-real-options'

defineOptions({ name: 'BFCheckbox' })

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

const realValue = ref(null)

const indeterminate = ref(false)
const checkAll = ref(false)

watch(
  () => model.value,
  val => {
    realValue.value = splitValue(val)

    // 如果showAll显示全选按钮，则改变单项时，需要进行一定的判断
    if (config.value.showAll) {
      // 表示全选了
      if (realValue.value.length === config.value.options.length) {
        indeterminate.value = false
        checkAll.value = true
      } else if (realValue.value.length > 0) {
        indeterminate.value = true
        checkAll.value = false
      } else {
        indeterminate.value = false
        checkAll.value = false
      }
    }
  },
  { immediate: true },
)

// 触发多选input函数
function handleCheckBox(val) {
  model.value = joinValue(val)
}

function handleCheckAll(val) {
  realValue.value = val ? config.value.options.map(i => i.key) : []
  indeterminate.value = false
}
</script>

<style scoped>
.bf-checkbox {
  &.show-all {
    .all-check {
      border-bottom: 1px solid #e9e9e9;
      padding-bottom: 6px;
      margin-bottom: 6px;
    }
    &.first {
      display: flex;
      align-items: center;
      .all-check.first {
        border-bottom: none;
        border-right: 1px solid #e9e9e9;
        padding-bottom: 6px;
        margin-bottom: 6px;
        padding: 0;
        margin: 0;
        margin-right: 16px;
        line-height: 20px;
        height: 20px;
      }
    }
  }
}
</style>
