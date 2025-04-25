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
    fieldDesc: '员工姓名',
    fieldLength: 10,
    fieldType: 'string',
    required: true,
  },
  {
    fieldName: 'fnumber',
    fieldDesc: '员工编号',
    fieldLength: 10,
    fieldType: 'string',
    required: true,
  },
  {
    fieldName: 'fage',
    fieldDesc: '员工年龄',
    fieldLength: 10,
    fieldType: 'number',
    required: false,
  },
  {
    fieldName: 'merit_pay',
    fieldDesc: '基本工资',
    fieldLength: 10,
    fieldType: 'number',
    required: false,
  },
  {
    fieldName: 'year_month',
    fieldDesc: '薪资周期',
    fieldLength: 0,
    fieldType: 'string',
    required: false,
  },
  {
    fieldName: 'birthday',
    fieldDesc: '出生日期',
    fieldLength: null,
    fieldType: 'date',
    required: false,
  },
]

// 模型数据，
const modelData = [
  {
    metadataKey: 'MetaData_1',
    storageDesc: '员工信息表',
    fields: realFields,
  },
  {
    metadataKey: 'MetaData_12',
    storageDesc: '家庭成员子表',
    fields: [
      {
        fieldName: 'zname',
        fieldDesc: '成员名称',
        fieldLength: 10,
        fieldType: 'string',
        required: true,
      },
      {
        fieldName: 'zphone',
        fieldDesc: '手机号',
        fieldLength: 10,
        fieldType: 'string',
        required: true,
      },
    ],
  },
]

export function useRenderEdit() {
  const renderFormRef = ref(null)
  const defaultModel = ref({})
  const { initSchema } = useRenderStore()

  function init(defaultData) {
    initSchema({}, customFields)
    defaultModel.value = { ...defaultData }
  }

  return {
    MakerDesign,
    jsonStr: null,
    modelData,
    customFields,
    renderFormRef,
    defaultModel,
    init,
  }
}
