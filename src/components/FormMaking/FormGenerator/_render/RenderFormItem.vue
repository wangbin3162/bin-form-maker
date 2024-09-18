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
      <template
        v-if="element.type === 'custom-component'"
        v-slot:[`custom-${element.config.compName}`]="{ node }"
      >
        <slot :name="`custom-${element.config.compName}`" v-bind:node="node"></slot>
      </template>
    </component>
  </b-form-item>
</template>

<script setup>
defineOptions({ name: 'RenderFormItem' })
import useRenderStore from '../../core/hooks/use-render-store'

const { widgetForm } = useRenderStore()

const models = defineModel({ type: Object, default: {} })

defineProps({
  element: {
    type: Object,
    default: () => ({}),
  },
})
</script>
