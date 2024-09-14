<template>
  <div class="p24">
    <b-button type="primary" @click="visible = true">打开设计器</b-button>
    <BFormMaker v-model="visible">
      <template #custom-customComp="{ node }">
        <CustomNode v-bind="node" />
      </template>
    </BFormMaker>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BFormMaker from '@/components/FormMaking/FormMaker/index.vue'
import CustomNode from './CustomNode.vue'

const visible = ref(true)
</script>
