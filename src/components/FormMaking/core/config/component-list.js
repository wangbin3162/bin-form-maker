/**
 * 布局控件
 * @type {*[]}
 */
export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    icon: 'appstore',
  },
  {
    type: 'group-container',
    name: '分组容器',
    icon: 'appstore',
  },
  {
    type: 'tab-container',
    name: 'Tab容器',
    icon: 'appstore',
  },
  {
    type: 'divider',
    name: '分割线',
    icon: 'border-verticle',
  },
]

/**
 * 基础的表单控件
 * @type {*[]}
 */
export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'edit-square',
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'file-text',
  },
  {
    type: 'input-number',
    name: '计数器',
    icon: 'shake',
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'plus-circle',
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'check-square',
  },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'select',
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'time-circle',
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'calendar',
  },
]

// 基础布局组件
export const isLayouts = type => layoutComponents.map(i => i.type).includes(type)

// 基础组件
export const isBaseCtrl = type => basicComponents.map(i => i.type).includes(type)

// 附带有字典选项的组件
export const isOptionsCtrl = type => ['radio', 'checkbox', 'select'].includes(type)
