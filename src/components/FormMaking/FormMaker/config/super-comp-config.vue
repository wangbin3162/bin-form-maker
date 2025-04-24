<template>
  <div class="comp-config-container">
    <div v-if="tab === 'base'">
      <!-- 基础字段配置 -->
      <FieldCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <CfgField label="组件类型" :labelWidth="labelWidth">
        <b-radio-group v-model="data.config.type" type="button" :size="size">
          <b-radio label="code">代码</b-radio>
          <b-radio label="url">远程</b-radio>
        </b-radio-group>
      </CfgField>

      <!-- 代码编辑器 -->
      <div v-if="data.config.type === 'code'" class="editor-pane">
        <h4 class="mb-8" flex="main:justify">
          组件代码
          <b-button
            type="text"
            icon="expend"
            title="展开编写器"
            @click="openEdit(data.config.currentCode)"
          />
        </h4>
        <div class="code">
          <b-ace-editor
            v-model="data.config.currentCode"
            theme="sqlserver"
            lang="html"
            :font-size="13"
            :options="{ showLineNumbers: false }"
            :styles="{ border: 'none' }"
          ></b-ace-editor>
        </div>
      </div>
      <!-- URL输入 -->
      <div v-else class="url-pane">
        <h4 class="mb-8">远程组件URL</h4>
        <b-input
          v-model="data.config.currentUrl"
          type="textarea"
          placeholder="输入远程Vue单文件组件URL"
        />
      </div>
      <div class="p8" />

      <div class="mb-8" flex="cross:center">
        <h4 class="mr-5">组件额外参数</h4>
        <b-tooltip content="输入自定义Json，然后自定义脚本中即可使用dynmicProps">
          <b-icon name="question-circle"></b-icon>
        </b-tooltip>
      </div>
      <div class="code">
        <b-ace-editor
          v-model="data.config.dynmicProps"
          theme="sqlserver"
          lang="json"
          height="200"
          :font-size="13"
          :options="{ showLineNumbers: false }"
          :styles="{ border: 'none' }"
        ></b-ace-editor>
      </div>

      <div class="p8" />

      <StatusCfg v-model="data" :labelWidth="labelWidth" :size="size" />

      <div class="status-container">
        <!-- <div class="mb-10">操作属性</div>
        <div class="checkbox">
          <b-checkbox v-model="data.config.editable">是否可输入</b-checkbox>
        </div> -->
      </div>
    </div>

    <div v-if="tab === 'validate'">
      <ValidateCfg v-model="data" :labelWidth="labelWidth" :size="size" />
    </div>

    <b-modal v-model="visible" title="组件代码编写" width="1200px" top="52px">
      <div class="code-editor">
        <div class="fun">
          <b-tag type="priamry">代码编写</b-tag>
          <p class="code">
            <b-ace-editor
              theme="sqlserver"
              lang="html"
              height="540"
              v-model="funcBodyStr"
              :font-size="13"
              :options="{ showLineNumbers: false }"
              :styles="{ border: 'none' }"
            ></b-ace-editor>
          </p>
        </div>
        <div class="right-tip">
          <b-tag>示例代码</b-tag>
          <b-button
            type="text"
            icon="file-copy"
            title="复制示例代码"
            @click="funcBodyStr = defaultSfcCode"
          />
          <div class="code">
            <b-ace-editor
              theme="sqlserver"
              lang="html"
              height="540"
              v-model="defaultSfcCode"
              readonly
              :font-size="13"
              :options="{ showLineNumbers: false }"
              :styles="{ border: 'none' }"
            ></b-ace-editor>
          </div>
        </div>
      </div>
      <template #footer>
        <b-button @click="visible = false">关闭</b-button>
        <b-button type="primary" @click="handleSave">保存</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import CfgField from '../components/Gui/CfgField.vue'
import FieldCfg from '../components/FieldCfg/index.vue'
import ValidateCfg from '../components/ValidateCfg/index.vue'
import StatusCfg from '../components/StatusCfg/index.vue'
import { defaultSfcCode } from '../../core/config/normal-sfc-demo'
defineOptions({ name: 'SuperCompConfig' })
import { ref } from 'vue'

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
  tab: {
    type: String,
    default: 'base',
  },
})

const visible = ref(false)

const funcBodyStr = ref('')

function openEdit(str) {
  funcBodyStr.value = str
  visible.value = true
}

// 保存关闭
function handleSave() {
  data.value.config.currentCode = funcBodyStr.value
  visible.value = false
}
</script>

<style scoped>
.code-editor {
  height: 580px;
  display: flex;

  .fun {
    width: calc(100% - 480px);
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
}
.code {
  padding: 5px 5px 5px 0;
  flex: 1;
  background: #fafafa;
  border-radius: 8px;

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
