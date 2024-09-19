<template>
  <div class="events-cfg">
    <cfg-field label="事件配置" :labelWidth="labelWidth"></cfg-field>
    <b-ace-editor :model-value="JSON.stringify(eventCfg, null, 2)" />
    <cfg-field label="脚本函数" :labelWidth="labelWidth">
      <b-checkbox v-model="eventCfg.customScript.enable">
        {{ eventCfg.customScript.enable ? '启用' : '不启用' }}
      </b-checkbox>

      <!-- 自定义（函数） -->
      <template v-if="eventCfg.customScript.enable">
        <CustomScripts
          v-model="eventCfg.customScript.funcBody"
          :arguments="eventCfg.customScript.arguments"
          style="display: inline-flex; width: auto"
          :paramsDesc="paramsDesc"
          :exampleDesc="exampleDesc"
          label=""
          funcExplain="通过提供的参数编写脚本，可以实现更灵活的表单界面控制。"
        />
      </template>
    </cfg-field>
  </div>
</template>

<script setup>
defineOptions({ name: 'EventsCfg' })
import useMakerStore from '../../hooks/useMakerStore'
import { deepCopy } from '@/components/FormMaking/core/utils/utils'
import { computed } from 'vue'
import { useParamsDesc } from '../../hooks/useParamsDesc'

const data = defineModel({ type: Object })

defineProps({
  size: {
    type: String,
    default: 'small',
  },
  labelWidth: {
    type: String,
    default: '85px',
  },
})

const eventCfg = computed(() => data.value.globalEvents)
const { paramsDesc, exampleDesc } = useParamsDesc()
</script>

<style scoped></style>
