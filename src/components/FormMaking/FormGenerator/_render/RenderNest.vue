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

      <RenderFormItem v-if="isBaseCtrl(element.type)" :element="element" v-model="models">
        <template
          v-if="element.type === 'custom-component'"
          v-slot:[`custom-${element.config.compName}`]="{ node }"
        >
          <slot :name="`custom-${element.config.compName}`" v-bind:node="node"></slot>
        </template>
      </RenderFormItem>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'RenderNest' })
import useRenderStore from '../../core/hooks/use-render-store'
import { isBaseCtrl, isLayouts } from '../../core/config/component-list'

const models = defineModel({ type: Object, default: {} })

const props = defineProps({
  widgets: {
    type: Array,
    default: () => [],
  },
})

const { widgetForm } = useRenderStore()
</script>
