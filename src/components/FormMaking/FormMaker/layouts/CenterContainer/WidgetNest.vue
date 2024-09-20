<template>
  <Draggable
    tag="div"
    item-key="key"
    group="form"
    ghost-class="ghost"
    handle=".drag-widget"
    :list="widgets"
    :animation="200"
    @add="handleWidgetAdd($event, widgets)"
  >
    <template #item="{ element, index }">
      <div
        class="widget-view"
        :class="{ active: isComSelected(element), 'widget-col': isLayouts(element.type) }"
        @click.stop="handleSelectWidget(element)"
      >
        <component
          v-if="isLayouts(element.type)"
          :is="`BF-${element.type}`"
          :data="element"
          :form-config="widgetForm.config"
        >
          <template v-slot="{ data }">
            <WidgetNest :widgets="data.list" class="widget-col-list" />
          </template>
        </component>

        <WidgetFormItem v-else :element="element">
          <template v-for="slot in slotsWedigets" :key="slot.type" v-slot:[slot.type]="{ node }">
            <slot :name="slot.type" v-bind:node="node"></slot>
          </template>
        </WidgetFormItem>

        <!-- 控制按钮 -->
        <div
          v-show="isComSelected(element)"
          class="widget-view-action"
          :class="{ 'widget-col-action': isLayouts(element.type) }"
        >
          <i
            class="b-iconfont b-icon-delete"
            title="删除"
            @click.stop="deleteWidget(widgets, index)"
          ></i>
        </div>
        <!-- 拖动按钮 -->
        <div
          v-show="isComSelected(element)"
          class="widget-view-drag"
          :class="{ 'widget-col-drag': isLayouts(element.type) }"
        >
          <i class="b-iconfont b-icon-drag drag-widget"></i>
        </div>

        <div class="widget-view-field-name">
          <span>{{ element.model }}</span>
        </div>
      </div>
    </template>
  </Draggable>
</template>

<script setup>
defineOptions({ name: 'WidgetNest' })
import Draggable from 'vuedraggable'
import { isLayouts } from '../../../core/config/component-list'
import useMakerStore from '../../hooks/useMakerStore'
import WidgetFormItem from './WidgetFormItem.vue'

defineProps({
  widgets: {
    type: Array,
    default: () => [],
  },
})

const {
  widgetForm,
  slotsWedigets,
  isComSelected,
  deleteWidget,
  handleSelectWidget,
  handleWidgetAdd,
} = useMakerStore()
</script>
