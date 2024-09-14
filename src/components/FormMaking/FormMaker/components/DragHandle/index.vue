<template>
  <div class="handle" :class="customClass" :style="styles" title="Drag sort">
    <img v-if="type === 'svg'" :src="svgImg[icon]" alt="move" />
    <i v-else :class="`b-iconfont b-icon-${icon}`" :style="{ fontSize: iconFontSize }" />
  </div>
</template>

<script>
import Icon1 from './drag-move.svg'
import Icon10 from './drag-move-pointer.svg'

export default {
  name: 'DragHandle',
  props: {
    customClass: {
      type: String,
      default: 'drag',
    },
    type: {
      type: String,
      default: 'svg', // svg icon
    },
    icon: {
      type: String,
      default: 'drag-move',
    },
    iconFontSize: {
      type: String,
    },
    styles: {
      type: Object,
    },
  },
  data() {
    return {
      svgImg: {
        'drag-move': Icon1,
        'gesture_drag-up-down': Icon10,
      },
    }
  },
}
</script>

<style scoped>
.handle {
  cursor: grab;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  font-size: 0;
  > img {
    width: 100%;
    opacity: 0.7;
    transition: 0.2s;
    &:hover {
      opacity: 1;
    }
  }
  > i {
    opacity: 0.8;
    transition: 0.2s;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
