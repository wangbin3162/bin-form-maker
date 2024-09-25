import MakerDesign from '@/components/FormMakingCustom/MakerDesign/index.vue'
import useRenderStore from '@/components/FormMaking/core/hooks/use-render-store'
import { ref } from 'vue'

// 自定义高级组件或者自定义组件
const customFields = [
  {
    type: 'custom-comp',
    name: '自定义组件',
    icon: 'appstoreadd',
  },
]

// 实际字段列表，注意，这里定义的为基本结构，使用时需要按这种方式进行一遍format处理后进行传入
const realFields = [
  {
    fieldName: 'fname',
    fieldTitle: '员工姓名',
    fieldLength: 10,
    fieldType: 'string',
    required: true,
  },
  {
    fieldName: 'fnumber',
    fieldTitle: '员工编号',
    fieldLength: 10,
    fieldType: 'string',
    required: true,
  },
  {
    fieldName: 'fage',
    fieldTitle: '员工年龄',
    fieldLength: 10,
    fieldType: 'number',
    required: false,
  },
  {
    fieldName: 'merit_pay',
    fieldTitle: '基本工资',
    fieldLength: 10,
    fieldType: 'number',
    required: false,
  },
  {
    fieldName: 'year_month',
    fieldTitle: '薪资周期',
    fieldLength: 0,
    fieldType: 'string',
    required: false,
  },
  {
    fieldName: 'birthday',
    fieldTitle: '出生日期',
    fieldLength: null,
    fieldType: 'date',
    required: false,
  },
]

export function useRenderEdit() {
  const renderFormRef = ref(null)
  const defaultModel = ref({})
  const { initSchema } = useRenderStore()

  function init(defaultData) {
    initSchema({}, realFields, customFields)
    defaultModel.value = { ...defaultData }
  }

  return {
    MakerDesign,
    jsonStr: null,
    realFields,
    customFields,
    renderFormRef,
    defaultModel,
    init,
  }
}
