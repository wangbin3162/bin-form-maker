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
      :is="`BF-${element.type}`"
      :data="element"
      :model-value="element.config.defaultValue"
      :form-config="widgetForm.config"
    />

    <div :class="['widget-view-field-name']">
      <span>{{ element.model }}</span>
    </div>
  </b-form-item>
</template>

<script setup>
defineOptions({ name: 'WidgetFormItem' })

import useStoreCenter from '@/components/FormMaking/FormMaker/hooks/store-center'

const { widgetForm } = useStoreCenter()

const props = defineProps({
  element: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style scoped>
.widget-view-field-name {
  position: absolute;
  top: 2px;
  right: 3px;
  font-size: 12px;
  color: var(--bin-color-success-light2);
  opacity: 0;
  z-index: 8;
  font-weight: 500;
  line-height: 22px;
}
</style>
