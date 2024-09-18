<template>
  <b-form-item :class="{ 'is-required': element.config.required }" :label="element.name">
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
      v-if="!element.config.hidden"
      :is="`BF-${element.type}`"
      :data="element"
      :model-value="element.config.defaultValue"
      :form-config="widgetForm.config"
    >
      <template v-for="slot in slotsWedigets" :key="slot.type" v-slot:[slot.type]="{ node }">
        <slot :name="slot.type" v-bind:node="node"></slot>
      </template>
    </component>

    <div
      v-else
      style="height: 32px; background-color: var(--bin-color-bg-disabled)"
      flex="main:center cross:center"
    >
      当前组件属于隐藏状态
    </div>
  </b-form-item>
</template>

<script setup>
defineOptions({ name: 'WidgetFormItem' })
import useMakerStore from '../../hooks/useMakerStore'

const { widgetForm, slotsWedigets } = useMakerStore()

defineProps({
  element: {
    type: Object,
    default: () => ({}),
  },
})
</script>
