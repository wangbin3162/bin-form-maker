export const defaultSfcCode = `<template>
  <div class="demo-component">
    <b-row :gutter="16">
      <b-col :span="12">
        <h3>数据绑定示例</h3>
        <p><b-input v-model="modelData"></b-input></p>
        <p>modelData: {{ modelData }}</p>
      </b-col>
      <b-col :span="12">
        <h3>参数/依赖/事件</h3>
        <b-space>
          <b-button type="primary" @click="consoleProps">查看传入参数</b-button>
          <b-button type="success" @click="consoleUtils">查看导入依赖</b-button>
          <b-button type="warning" @click="sendEvent">发送自定义事件</b-button>
        </b-space>
      </b-col>
    </b-row>
    <b-divider></b-divider>

    <h3>ECharts 示例</h3>
    <div ref="chartEl" style="width: 100%; height: 300px;"></div>
    <b-divider></b-divider>

    <h3>使用外部工具示例</h3>
    <p>Generated ID: {{ id }}</p>
    <p>Formatted date: {{ formattedDate }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import * as echarts from 'echarts'
import utils from 'utils'
import { fetchData } from '@api/request'
import { SUPER_COMP_EVENT } from 'emitter'

// 通用事件
const emit = defineEmits([SUPER_COMP_EVENT])

const props = defineProps({
  formModel: {
    type: Object,
    default: () => ({})
  },
  ctrlCfgs: {
    type: Object,
    default: () => ({})
  },
  dynmicProps: {
    type: Object,
    default: () => ({})
  }
})

const modelData = defineModel()

// 打印导入的工具
function consoleUtils() {
  console.log('utils ========>', utils)
  console.log('fetchData ========>', fetchData)
}

// 打印传入参数
function consoleProps() {
  console.log('formModel ========>', props.formModel)
  console.log('ctrlCfgs ========>', props.ctrlCfgs)
  console.log('dynmicProps ========>', props.dynmicProps)
}

const { uuid, Dayjs } = utils
const chartEl = ref(null)
const id = uuid()
const formattedDate = computed(() => Dayjs().format('YYYY-MM-DD HH:mm:ss'))

// 事件发送示例
function sendEvent() {
  emit(SUPER_COMP_EVENT, {
    type: 'custom-event',
    data: {
      value: modelData.value,
      timestamp: Date.now()
    }
  })
}

onMounted(() => {
  if (chartEl.value) {
    const chart = echarts.init(chartEl.value)
    chart.setOption({
      title: { text: '动态加载的ECharts图表' },
      tooltip: {},
      xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
      yAxis: {},
      series: [{
        name: '示例数据',
        type: 'bar',
        data: [5, 20, 36, 10, 10]
      }]
    })

    chart.on('click', function(params) {
      emit(SUPER_COMP_EVENT, {
        type: 'echarts-event',
        data: {
          value: params.name + ': ' + params.value,
          timestamp: Date.now()
        }
      })
    });
  }
})
</script>

<style scoped>
.demo-component {
  font-family: Arial, sans-serif;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
}
</style>
`
