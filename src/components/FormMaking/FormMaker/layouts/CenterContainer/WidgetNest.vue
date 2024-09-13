<template>
  <Draggable
    tag="div"
    item-key="key"
    group="form"
    ghost-class="ghost"
    handle=".drag-widget"
    :list="widgets"
    :animation="200"
  >
    <template #item="{ element, index }">
      <div
        class="widget-view"
        :class="{ active: isComSelected(element), 'widget-col': isLayouts(element.type) }"
        @click.stop="handleSelectWidget(element)"
      >
        <div v-if="isLayouts(element.type)">容器组件</div>
        <WidgetFormItem v-if="isBaseCtrl(element.type)" :element="element" />

        <!-- 控制按钮 -->
        <div
          v-show="isComSelected(element)"
          class="widget-view-action"
          :class="{ 'widget-col-action': element.type === 'grid' }"
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
      </div>
    </template>
  </Draggable>
</template>

<script setup>
defineOptions({ name: 'WidgetNest' })
import Draggable from 'vuedraggable'
import { isBaseCtrl, isLayouts } from '@/components/FormMaking/core/config/component-list'
import useStoreCenter from '@/components/FormMaking/FormMaker/hooks/store-center'

const props = defineProps({
  widgets: {
    type: Array,
    default: () => [],
  },
})

const { isComSelected, deleteWidget, handleSelectWidget } = useStoreCenter()
</script>
