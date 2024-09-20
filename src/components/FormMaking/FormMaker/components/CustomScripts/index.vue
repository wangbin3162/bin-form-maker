<template>
  <div class="custom-scripts">
    <div v-if="label" class="func-name" flex="main:justify cross:center">
      <span class="tip">{{ label }}</span>
      <b-button type="text" icon="edit" size="small" @click="openEditor">编辑</b-button>
    </div>

    <b-button v-else type="text" icon="edit" size="small" @click="openEditor">编辑</b-button>

    <CustomScriptsEditor
      ref="editorRef"
      v-model="data"
      :title="label + '编辑器'"
      :funcExplain="funcExplain"
      :arguments="arguments"
      :paramsDesc="paramsDesc"
      :exampleDesc="exampleDesc"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomScriptsEditor from './EditorModal.vue'

defineOptions({ name: 'CustomScripts' })

defineProps({
  // 标题显示标签
  label: {
    type: String,
    default: '自定义脚本',
  },
  // 函数说明
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
    default: () => [
      { name: 'formModel', desc: '当前表单的存储对象', code: '' },
      { name: 'ctrlCfgs', desc: '当前控件配置集合,可通过字段取得对应控件的配置信息', code: '' },
    ],
  },
  // 示例代码 {name,code} 的对象数组，name表示示例名称，code表示对应代码
  exampleDesc: {
    type: Array,
    default: () => [
      // { name: '条件必填', code: "console.log('test')" },
      // { name: '级联校验', code: "console.log('test')" },
    ],
  },
})

const data = defineModel()

const editorRef = ref(null)

function openEditor() {
  editorRef.value?.open()
}
</script>

<style scoped>
.custom-scripts {
  width: 100%;
  .func-name {
    font-size: 12px;
    .tip {
      padding: 2px 7px;
      line-height: 22px;
      background-color: var(--bin-color-info-light6);
      border: 1px solid var(--bin-color-info-light4);
      color: var(--bin-color-info-light1);
      border-radius: var(--bin-border-radius-default);
    }
  }
  .fun {
    padding: 4px 0;
    font-size: 13px;
    color: #b478cf;
    .params {
      color: var(--bin-color-warning);
    }
    .bottom {
      margin-bottom: 5px;
    }
  }
}
</style>
