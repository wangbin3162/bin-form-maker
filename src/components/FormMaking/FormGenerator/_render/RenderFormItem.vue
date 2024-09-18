<template>
  <b-form-item v-if="!element.config.hidden" :label="element.name" :prop="element.model">
    <template #label>
      <span style="margin-left: 2px" class="over-hidden" :title="element.label">
        {{ element.label }}
      </span>

      <b-tooltip
        v-if="element.config.tooltip !== ''"
        :content="element.config.tooltip"
        theme="light"
      >
        <b-icon name="question-circle" style="margin-left: 2px" size="14" />
      </b-tooltip>
    </template>

    <component
      :is="`BF-${element.type}`"
      :data="element"
      v-model="models[element.model]"
      :form-config="widgetForm.config"
    >
      <template v-for="slot in slotsWedigets" :key="slot.type" v-slot:[slot.type]="{ node }">
        <slot :name="slot.type" v-bind:node="node"></slot>
      </template>
    </component>
  </b-form-item>
</template>

<script setup>
defineOptions({ name: 'RenderFormItem' })
import useRenderStore from '../../core/hooks/use-render-store'

const { widgetForm, slotsWedigets } = useRenderStore()

const models = defineModel({ type: Object, default: {} })

defineProps({
  element: {
    type: Object,
    default: () => ({}),
  },
})
</script>
