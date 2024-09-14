<template>
  <div class="example-wrap">
    <b-collapse :model-value="'0'" simple>
      <b-collapse-panel
        v-for="(item, index) in exampleDesc"
        :key="index"
        :name="index + ''"
        :title="`示例${index + 1}: ${item.name}`"
      >
        <div class="code">
          <highlightjs language="js" :code="item.code" />
        </div>
      </b-collapse-panel>
    </b-collapse>
  </div>
</template>

<script setup>
defineOptions({ name: 'CustomScriptsExamples' })

defineProps({
  // 示例代码 {name,code} 的对象数组，name表示示例名称，code表示对应代码
  exampleDesc: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.example-wrap {
  .code {
    padding: 8px;
  }
}
</style>
