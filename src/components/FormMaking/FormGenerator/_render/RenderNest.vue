<template>
  <div>
    <div v-for="element in widgets" class="widget-view" :key="element.key">
      <component
        v-if="isLayouts(element.type)"
        :is="`BF-${element.type}`"
        :data="element"
        :form-config="widgetForm.config"
      >
        <template v-slot="{ data }">
          <RenderNest :widgets="data.list" class="widget-col-list" v-model="models" />
        </template>
      </component>

      <RenderFormItem v-else :element="element" v-model="models">
        <template v-for="slot in slotsWedigets" :key="slot.type" v-slot:[slot.type]="{ node }">
          <slot :name="slot.type" v-bind:node="node"></slot>
        </template>
      </RenderFormItem>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'RenderNest' })
import useRenderStore from '../../core/hooks/use-render-store'
import { isLayouts } from '../../core/config/component-list'

const models = defineModel({ type: Object, default: {} })

defineProps({
  widgets: {
    type: Array,
    default: () => [],
  },
})

const { widgetForm, slotsWedigets } = useRenderStore()
</script>
