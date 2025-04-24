<template>
  <div>
    <div>远程VUE组件</div>
    <b-button type="primary" @click="visible = true">Open</b-button>

    <b-modal v-model="visible" title="普通的模态框标题" :z-index="1000">
      <p>我是弹窗内容...</p>
      <p>我是弹窗内容...</p>
      <p>我是弹窗内容...</p>
      <template #footer>
        <span>
          <b-button @click="onClose">取 消</b-button>
          <b-button type="primary" @click="onOk">确 定</b-button>
        </span>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Message } from 'bin-ui-design'

const visible = ref(false)

function onOk() {
  visible.value = false
  Message('点击确定')
}

function onClose() {
  visible.value = false
  Message('点击取消')
}
</script>

<style scoped></style>
