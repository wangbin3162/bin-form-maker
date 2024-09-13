<template>
  <div class="maker-layout">
    <transition name="move-right">
      <div v-if="visible" class="fm-container" :class="{ inner }">
        <div class="fm-header">
          <div class="title">
            <span class="logo">
              <b-icon name="insertrowabove" size="24"></b-icon>
            </span>
            <div class="over-hidden">
              <span v-if="topTitle">{{ topTitle }}</span>
            </div>
          </div>
          <div class="right">
            <b-icon name="close" type="button" @click="close" />
          </div>
        </div>
        <div class="fm-content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import useLockScreen from './useLockScreen'
import { MessageBox } from 'bin-ui-design'

defineOptions({ name: 'MakerLayout' })

const emit = defineEmits(['close', 'rollback'])
defineProps({
  topTitle: {
    type: String,
    default: 'FormMaker 表单设计器',
  },
  inner: Boolean,
})

const visible = defineModel({ type: Boolean, default: false })

useLockScreen(visible)

function close() {
  MessageBox.confirm({
    type: 'warning',
    title: '提示',
    message: '<p>没有保存的内容会<span style="color:red;">丢失</span>！确认返回吗？</p>',
    useHTML: true,
  })
    .then(() => {
      // 获取应用信息
      visible.value = false
      emit('close')
    })
    .catch(() => {})
}
</script>

<style scoped>
.fm-container {
  user-select: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #fff;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  z-index: 1000;
  &.inner {
    position: absolute;
    .fm-header {
      background-color: #fff;
      border-bottom: 1px solid var(--bin-border-color-base);
      .title {
        color: #333;
      }
      .right .b-icon-close {
        color: #333;
      }
    }
  }
  .fm-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    height: 50px;
    padding: 16px;
    color: #f0f0f0;
    background: #fff;
    border-bottom: 1px solid var(--bin-border-color-base);
    .title {
      display: inline-flex;
      align-items: center;
      width: 90%;
      font-weight: 500;
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgba(0, 0, 0, 0.85);
      white-space: nowrap;
      .logo {
        font-size: 28px;
        font-weight: bold;
        background: linear-gradient(
          to right,
          var(--bin-color-primary),
          var(--bin-color-primary-light3)
        );
        -webkit-background-clip: text;
        color: transparent;
        margin-right: 8px;
      }
      .over-hidden {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      .formName {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        padding-left: 10px;
      }
    }
    .right {
      display: flex;
      align-items: center;

      .b-icon-close {
        font-size: 18px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.85);
        &:hover {
          color: #ff7072;
        }
      }
    }
  }
  .fm-content {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
  }
}
</style>
