<template>
  <b-modal
    v-model="visible"
    :title="modalTitle"
    :mask-closable="false"
    :esc-closable="false"
    :z-index="4000"
    width="1400px"
    top="50px"
    append-to-body
    screen-center
    destroy-on-close
    @opened="render = true"
  >
    <div class="code-editor">
      <template v-if="render">
        <div class="fun">
          <p class="top">
            async function (
            <span class="params">{{ params }}</span>
            ){
          </p>
          <p class="code">
            <b-ace-editor
              theme="sqlserver"
              wrap
              lang="typescript"
              height="450"
              v-model="funcBodyStr"
              :font-size="13"
              :options="{ showLineNumbers: false }"
              :styles="{ border: 'none' }"
            ></b-ace-editor>
          </p>
          <p class="bottom">}</p>
        </div>
        <div class="right-tip">
          <b-radio-group v-model="tipType" type="capsule" size="large" style="width: 100%">
            <b-radio :label="0">变量说明</b-radio>
            <b-radio :label="1">脚本示例</b-radio>
          </b-radio-group>
          <div class="tip-content">
            <b-scrollbar>
              <CustomScriptsParams v-if="tipType === 0" :paramsDesc="paramsDesc" />
              <CustomScriptsExamples v-if="tipType === 1" :exampleDesc="exampleDesc" />
            </b-scrollbar>
          </div>
        </div>
      </template>

      <b-skeleton animation v-else :rows="15"></b-skeleton>
    </div>
    <template #footer>
      <div flex="main:justify">
        <div flex="cross:center">
          <template v-if="funcExplain">
            <b-tag>
              <b-icon name="file-text"></b-icon>
              说明
            </b-tag>
            <span class="pl-5" style="color: var(--bin-color-danger-light1)">
              {{ funcExplain }}
            </span>
          </template>
        </div>
        <div>
          <b-button @click="visible = false">关闭</b-button>
          <b-button type="primary" @click="handleSave">保存</b-button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import CustomScriptsParams from './Params.vue'
import CustomScriptsExamples from './Examples.vue'
defineOptions({ name: 'CustomScriptsEditor' })

const props = defineProps({
  modalTitle: {
    type: String,
  },
  funcExplain: {
    type: String,
  },
  // 函数入参,这里不包含最后都注入的util，和comApi
  arguments: {
    type: Array,
    default: () => [],
  },
  // 实际编辑的脚本值
  modelValue: {
    type: String,
    default: '',
  },
  // 参数描述
  paramsDesc: {
    type: Array,
    default: () => [],
  },
  // 示例代码 {name,code} 的对象数组，name表示示例名称，code表示对应代码
  exampleDesc: {
    type: Array,
    default: () => [],
  },
})

const data = defineModel()

const visible = ref(false)
const render = ref(false)
const funcBodyStr = ref('')
const tipType = ref(0) //  { 0: '变量说明', 1: '介绍案例' }

const params = computed(() => [...props.arguments, 'fetchData', 'util'].join(', '))

function open() {
  funcBodyStr.value = data.value
  render.value = false
  tipType.value = 0
  visible.value = true
}

// 保存关闭
function handleSave() {
  data.value = funcBodyStr.value
  tipType.value = 0
  visible.value = false
}

defineExpose({
  open,
})
</script>

<style scoped>
.code-editor {
  height: 580px;
  display: flex;
  .fun {
    display: flex;
    flex-direction: column;
    width: calc(100% - 480px);
    font-size: 14px;
    color: #b478cf;
    .params {
      color: var(--bin-color-primary);
    }
    .code {
      padding: 5px 5px 5px 0;
      flex: 1;
      background: #fafafa;
      border-radius: 8px;
    }
    .bottom {
      margin-bottom: 5px;
    }
  }
  .right-tip {
    width: 480px;
    border-left: 1px solid var(--v-g-border-color);
    padding-left: 8px;
    .tip-content {
      height: calc(100% - 40px);
      margin-top: 6px;
      overflow-y: auto;
    }
  }

  :deep(.ace-sqlserver) {
    background: transparent;
    line-height: 18px;
    .ace_gutter {
      background: transparent;
    }
    .ace_gutter-active-line {
      background: transparent;
    }
    .ace_marker-layer .ace_active-line {
      background: rgba(0, 0, 0, 0.02);
    }
  }
  :deep(.hljs) {
    padding: 16px;
    border-radius: 8px;
    font-size: 13px;
    font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
    background: #fafafa;
    white-space: pre-wrap;
    line-height: 1.5715;
  }
  :deep(.bin-collapse-content) {
    padding: 0;
    .bin-collapse-content-box {
      padding: 0;
    }
  }
}
</style>
