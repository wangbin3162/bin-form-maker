<template>
  <div class="widget-form-container">
    <b-form
      ref="formRef"
      :label-position="widgetForm.config.labelPosition"
      :label-suffix="widgetForm.config.labelSuffix"
      :label-width="`${widgetForm.config.labelWidth}px`"
      :size="widgetForm.config.size"
    >
      <!-- 附加递归嵌套控件 -->
      <widget-nest class="widget-form-list" :widgets="widgetForm.list" />
    </b-form>
  </div>
</template>

<script setup>
defineOptions({ name: 'WidgetForm' })
import useStoreCenter from '@/components/FormMaking/FormMaker/hooks/store-center'

const { widgetForm } = useStoreCenter()
</script>

<style>
.widget-form-container {
  .widget-form-list {
    background: #fff;
    border: 1px dashed #999;
    min-height: 500px;
    margin: 12px;
    transition: 0.25s;
    .widget-view {
      padding: 6px 2px 18px;
      position: relative;
      border: 1px dashed rgba(170, 170, 170, 0.7);
      background-color: rgba(236, 245, 255, 0.3);
      margin: 2px;
      .bin-form-item {
        margin-bottom: 0;
      }
      &:hover {
        background: #ecf5ff;
        border: 1px solid var(--bin-color-primary);
        .widget-view-field-name {
          opacity: 0.8;
        }
        &.active {
          outline: 1px solid var(--bin-color-primary);
          border: 1px solid var(--bin-color-primary);
          outline-offset: 0;
        }
      }
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 8;
        display: block;
      }
      .widget-view-action {
        position: absolute;
        right: -1px;
        bottom: -1px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--bin-color-primary);
        opacity: 0.8;
        z-index: 9;
        i {
          font-size: 16px;
          color: #fff;
          margin: 0 4px;
          cursor: move;
        }

        &:hover {
          opacity: 1;
        }
      }
      .widget-view-drag {
        position: absolute;
        left: -1px;
        top: 0px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--bin-color-primary);
        opacity: 0.8;
        z-index: 9;
        i {
          font-size: 18px;
          color: #fff;
          margin: 0 4px;
          cursor: pointer;
        }

        &:hover {
          opacity: 1;
        }
      }
      .widget-view-field-name {
        position: absolute;
        top: 6px;
        right: 4px;
        font-size: 12px;
        color: #67c23a;
        z-index: 9;
        font-weight: 500;
        width: 40%;
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &.active {
        outline: 1px solid var(--bin-color-primary);
        border: 1px solid var(--bin-color-primary);
        .widget-view-field-name {
          opacity: 0.8;
        }
      }
      &.ghost {
        background: #f56c6c;
        border: 2px solid #f56c6c;
        outline-width: 0;
        height: 3px;
        box-sizing: border-box;
        font-size: 0;
        content: '';
        overflow: hidden;
        padding: 0;
      }
    }

    .widget-col {
      padding: 5px;
      background-color: rgba(253, 246, 236, 0.3);

      &.active {
        outline: 1px solid #fea638;
        border: 1px solid #fea638;
      }

      &:hover {
        background: #fdf6ec;
        border: 1px solid #fea638;

        &.active {
          outline: 1px solid #fea638;
          border: 1px solid #fea638;
          outline-offset: 0;
        }
      }

      .bin-col {
        min-height: 50px;
      }

      &.ghost {
        background: #f56c6c;
        border: 2px solid #f56c6c;
        outline-width: 0;
        height: 3px;
        box-sizing: border-box;
        font-size: 0;
        content: '';
        overflow: hidden;
        padding: 0;
      }

      .widget-view-drag.widget-col-drag {
        background: #fea638;
      }

      .widget-view-action {
        background: #fea638;
      }
      &::after {
        display: none;
      }
    }

    .widget-col-list {
      min-height: 50px;
      border: 1px dashed #ccc;
      background: #fff;
    }

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
  }
  .ghost {
    background: #f56c6c;
    border: 2px solid #f56c6c;
    position: relative;
    &::after {
      background: #f56c6c;
    }
  }

  li.ghost {
    height: 3px;
    list-style: none;
    font-size: 0;
    overflow: hidden;
  }
  .bin-form {
    .bin-form-item-content,
    .bin-form-item__content {
      position: unset;
    }
  }
  .bin-form-item__content .bin-switch {
    margin-top: 0;
  }
}
</style>
