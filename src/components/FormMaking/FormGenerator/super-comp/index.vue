<template>
  <div class="super-comp-container" v-if="!config.hidden">
    <DynamicVue3Loader
      :mode="config.type"
      v-model="model"
      v-model:code="config.currentCode"
      v-model:url="config.currentUrl"
      :external-dependencies="externalDeps"
      :component-props="dynmicPropsValue"
      :component-events="dynmicEvents"
      @loaded="handleComponentLoaded"
      @error="handleComponentError"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import DynamicVue3Loader from './vue3-loader/DynamicVue3Loader.vue'
import useRenderStore from '../../core/hooks/use-render-store'
import { emitter, SUPER_COMP_EVENT } from '../../core/utils/eventBus'
import { Message, MessageBox, Notice } from 'bin-ui-design'
import * as echarts from 'echarts'
import * as utils from '@/utils/util.js'
import { fetchData } from '@/api/request'
defineOptions({ name: 'BFSuperComp' })

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

const { formModels, ctrlCfgs } = useRenderStore()

const model = defineModel({ type: [String, Number, Object, Array], default: '' })

// config 配置项
const config = computed(() => props.data.config)

// 示例props
const dynmicPropsValue = ref({})
watch(
  () => config.value,
  cfg => {
    dynmicPropsValue.value = {
      formModel: formModels.value,
      ctrlCfgs: ctrlCfgs.value,
      dynmicProps: utils.fromJson(cfg.dynmicProps) || {},
    }
  },
  { immediate: true, deep: true },
)

// 外部依赖
const externalDeps = {
  'bin-ui-design': {
    Message,
    MessageBox,
    Notice,
  },
  echarts,
  utils,
  '@api/request': { fetchData },
  emitter: { SUPER_COMP_EVENT },
}

// 示例事件处理
const dynmicEvents = {
  [SUPER_COMP_EVENT]: data => emitter.emit(SUPER_COMP_EVENT, data),
}

const handleComponentLoaded = component => {
  console.log('组件加载成功:', component)
}

const handleComponentError = error => {
  console.error('组件加载失败:', error)
}
</script>
