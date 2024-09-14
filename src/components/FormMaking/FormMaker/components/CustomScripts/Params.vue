<template>
  <div class="example-wrap">
    <b-collapse :model-value="'0'" simple>
      <b-collapse-panel
        v-for="(item, index) in paramsDesc"
        :key="index"
        :name="index + ''"
        :title="item.name"
      >
        <div class="tip">{{ item.desc }}</div>
        <div class="code">
          <b-ace-editor
            v-if="item.json"
            theme="sqlserver"
            wrap
            readonly
            lang="json"
            :height="height"
            :font-size="13"
            :model-value="item.code"
            :options="{ showLineNumbers: false }"
            :styles="{ border: 'none' }"
          ></b-ace-editor>
          <highlightjs v-else language="js" :code="item.code" />
        </div>
      </b-collapse-panel>
    </b-collapse>
  </div>
</template>

<script setup>
defineOptions({ name: 'CustomScriptsParams' })

defineProps({
  // 外部脚本和内部示例脚本的高度
  height: {
    type: String,
    default: '250',
  },
  // 参数描述
  paramsDesc: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.example-wrap {
  .tip {
    padding: 8px 5px 0;
    color: #8e8c8c;
  }
  .code {
    padding: 8px;
  }
}
</style>
