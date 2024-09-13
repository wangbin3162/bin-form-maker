<template>
  <div class="center-container">
    <div class="top-fix" flex="main:justify cross:center">
      <div class="top-fix-left" flex="cross:center"></div>
      <div class="top-fix-right">
        <b-button type="text" icon="eye">预览</b-button>
        <b-divider type="vertical" />
        <DebugModal style="display: inline-block" :data="{ widgetForm }">
          <b-button type="text" icon="edit-square">查看JSON</b-button>
        </DebugModal>
        <b-divider type="vertical" />
        <b-button type="text" icon="save">保存</b-button>
        <b-divider type="vertical" />
        <action-button type="text" color="#f5222d" icon="delete" message="确认清空画布吗？" confirm>
          清空
        </action-button>
      </div>
    </div>
    <div class="scroll-content">
      <b-scrollbar>
        <div class="form-empty" v-if="widgetForm.list.length === 0">
          <b-empty>从左侧拖拽或点击来添加字段</b-empty>
        </div>
        <WidgetForm />
      </b-scrollbar>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'CenterContainer' })
import useStoreCenter from '@/components/FormMaking/FormMaker/hooks/store-center'

const { widgetForm } = useStoreCenter()
</script>

<style scoped>
.center-container {
  width: calc(100% - 600px);
  height: 100%;
  overflow: hidden;
  border-left: 1px solid var(--bin-border-color-base);
  border-right: 1px solid var(--bin-border-color-base);

  .top-fix {
    height: 45px;
    padding: 0 16px;
    border-bottom: 1px solid var(--bin-border-color-base);
  }
  .scroll-content {
    height: calc(100% - 45px);
    position: relative;
    background: #fafafa;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .form-empty {
    position: absolute;
    text-align: center;
    height: 20px;
    font-size: 20px;
    top: 120px;
    width: 100%;
    color: #ccc;
  }
}
</style>
