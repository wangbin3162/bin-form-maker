<!-- DynamicComponentLoader.vue - 支持代码和远程URL的加载器 -->
<template>
  <div class="dynamic-loader">
    <div class="preview-container">
      <div v-if="state.loading" class="state-loading">
        <span class="loader-spinner"></span>
        组件加载中...
      </div>

      <template v-else>
        <div v-if="state.error" class="state-error">
          <h4>加载错误</h4>
          <pre>{{ state.error }}</pre>
        </div>

        <Suspense v-else>
          <template #default>
            <div class="component-container">
              <component
                :is="dynamicComponent"
                v-model="modelData"
                v-bind="mergedProps"
                v-on="mergedEvents"
              />
            </div>
          </template>
          <template #fallback>
            <div class="state-loading">组件初始化中...</div>
          </template>
        </Suspense>
      </template>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'DynamicVue3Loader' })
import * as Vue from 'vue'
import { ref, reactive, computed, shallowRef, watch, onMounted } from 'vue'
import { initSfcLoader } from './sfc-loader'

const props = defineProps({
  // 初始代码
  code: {
    type: String,
    default: '',
  },
  // 初始URL
  url: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'code',
  },
  // 外部依赖
  externalDependencies: {
    type: Object,
    default: () => ({}),
  },
  // 传递给组件的props
  componentProps: {
    type: Object,
    default: () => ({}),
  },
  // 监听的事件
  componentEvents: {
    type: Object,
    default: () => ({}),
  },
  // 防抖延迟(ms)
  debounceTime: {
    type: Number,
    default: 500,
  },
})

const emit = defineEmits(['loaded', 'error', 'update:code', 'update:url'])

const modelData = defineModel()

// 状态管理
const state = reactive({
  loading: false,
  error: null,
})

// 响应式数据
const codeInput = ref(props.code)
const remoteUrl = ref(props.url)
const dynamicComponent = shallowRef(null)

// 初始化加载器
const sfcLoader = initSfcLoader({
  vue: Vue,
  dependencies: props.externalDependencies,
})

// 合并props和events
const mergedProps = computed(() => ({
  ...props.componentProps,
  key: state.mode === 'code' ? codeInput.value : remoteUrl.value,
}))

const mergedEvents = computed(() => ({
  ...props.componentEvents,
}))

// 从代码加载组件
const loadFromCode = async () => {
  if (!codeInput.value.trim()) {
    dynamicComponent.value = null
    return
  }
  state.loading = true
  state.error = null

  const { component, error } = await sfcLoader.loadFromCode(
    codeInput.value,
    props.externalDependencies,
  )

  handleLoadResult(component, error)
  emit('update:code', codeInput.value)
}

// 从URL加载组件
const loadRemoteComponent = async () => {
  if (!remoteUrl.value.trim()) {
    dynamicComponent.value = null
    return
  }

  state.loading = true
  state.error = null

  const { component, error } = await sfcLoader.loadFromUrl(
    remoteUrl.value,
    props.externalDependencies,
  )

  handleLoadResult(component, error)
  emit('update:url', remoteUrl.value)
}

// 处理加载结果
const handleLoadResult = (component, error) => {
  if (error) {
    state.error = error
    dynamicComponent.value = sfcLoader.createErrorComponent(error)
    emit('error', error)
  } else {
    dynamicComponent.value = component
    emit('loaded', component)
  }

  state.loading = false
}

// 防抖处理代码变化
let debounceTimer = null
const handleCodeChange = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (props.mode === 'code') {
      loadFromCode()
    } else {
      loadRemoteComponent()
    }
  }, props.debounceTime)
}

// 监听初始值变化
watch(
  () => props.code,
  newCode => {
    if (newCode && newCode !== codeInput.value) {
      codeInput.value = newCode
      handleCodeChange()
    }
  },
)

watch(
  () => props.url,
  newUrl => {
    if (newUrl && newUrl !== remoteUrl.value) {
      remoteUrl.value = newUrl
      handleCodeChange()
    }
  },
)

// 初始化加载
onMounted(() => {
  if (props.mode === 'code') {
    loadFromCode()
  } else {
    loadRemoteComponent()
  }
})

// 暴露方法
defineExpose({
  loadCode: code => {
    codeInput.value = code
    return loadFromCode()
  },
  loadUrl: url => {
    remoteUrl.value = url
    return loadRemoteComponent()
  },
  getCurrentCode: () => codeInput.value,
  getCurrentUrl: () => remoteUrl.value,
})
</script>

<style scoped>
.dynamic-loader {
  display: flex;
  flex-direction: column;
}

.state-loading,
.state-error {
  padding: 20px;
  text-align: center;
}

.state-error {
  color: #d32f2f;
  text-align: left;
}

.state-error pre {
  white-space: pre-wrap;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}

.loader-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #1976d2;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
