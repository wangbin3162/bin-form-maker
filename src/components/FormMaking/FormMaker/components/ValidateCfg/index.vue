<template>
  <div class="rules-container">
    <div class="top-control">
      <b-space>
        <b-checkbox
          v-model="config.required"
          style="margin: 0; line-height: 24px"
          @change="requiredChange"
        >
          必填
        </b-checkbox>
        <b-divider type="vertical" />
        <b-dropdown @command="setRules" appendToBody>
          <span style="cursor: pointer">
            格式
            <b-icon name="down"></b-icon>
          </span>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item
                v-for="(name, key) in SIMPLE_RULE"
                :key="key"
                :name="name"
                :disabled="hasSameRule(name)"
                :divided="name === RULE.regexp || name === RULE.email || name === RULE.idCode"
              >
                {{ RULE_NAME_MAP[name] }}
              </b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
        <b-divider type="vertical" />
        <b-dropdown @command="setRules" appendToBody>
          <span style="cursor: pointer">
            类型
            <b-icon name="down"></b-icon>
          </span>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item
                v-for="(name, key) in TYPE_RULE"
                :key="key"
                :name="name"
                :disabled="hasSameRule(name)"
                :divided="name === RULE.regexp"
              >
                {{ RULE_NAME_MAP[name] }}
              </b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
        <b-divider type="vertical" />
        <b-dropdown @command="setRules" appendToBody>
          <span style="cursor: pointer">
            关联
            <b-icon name="down"></b-icon>
          </span>
          <template #dropdown>
            <b-dropdown-menu>
              <b-dropdown-item v-for="(name, key) in MULTIPLE_RULE" :key="key" :name="name">
                {{ RULE_NAME_MAP[name] }}
              </b-dropdown-item>
            </b-dropdown-menu>
          </template>
        </b-dropdown>
      </b-space>
    </div>

    <b-divider style="margin: 10px 0" />

    <Draggable
      class="check-rules-wrap"
      tag="ul"
      :list="checkRules"
      drag-class="drag-item-class"
      ghost-class="blue-background-class"
      handle=".drag"
      :animation="200"
      force-fallback
      item-key="index"
    >
      <template #item="{ element: rule, index }">
        <li class="rules-list-item" :key="index">
          <div
            class="role-name drag"
            :class="rulesClass(rule.name)"
            flex="cross:center"
            style="width: 100%"
          >
            <span class="rules-title">
              {{ RULE_NAME_MAP[rule.name] }}
            </span>
            <div class="delete">
              <b-button
                title="移除"
                icon="close-circle"
                :icon-style="{ fontSize: '16px', color: '#f5222d' }"
                type="text"
                @click="removeRules(index)"
              ></b-button>
            </div>
          </div>
          <div class="rules-params">
            <!--长度参数-->
            <template v-if="rule.name === RULE.length">
              <div class="title-box" title="最小值">
                <span>最小值</span>
                <b-input-number
                  v-model="checkRules[index].min"
                  :min="0"
                  :precision="0"
                  size="small"
                ></b-input-number>
              </div>
              <div class="title-box" title="最大值">
                <span>最大值</span>
                <b-input-number
                  v-model="checkRules[index].max"
                  size="small"
                  :min="0"
                ></b-input-number>
              </div>
            </template>

            <!--身份证，统一社会信用代码，组织机构代码，工商注册号-->
            <template v-if="[RULE.idCode].includes(rule.name)">
              <b-checkbox v-model="checkRules[index].ignoreCase">忽略大小写</b-checkbox>
            </template>
            <!--正则匹配-->
            <template v-if="rule.name === RULE.regexp">
              <div class="title-box is-message" title="正则规则">
                <span>正则规则</span>
                <b-input
                  v-model.trim="checkRules[index].regexp"
                  size="small"
                  placeholder="需输入字符格式"
                ></b-input>
              </div>
            </template>

            <!--条件必填，条件必不填-->
            <template
              v-if="rule.name === RULE.conditionRequired || rule.name === RULE.conditionNotRequired"
            >
              <div class="title-box" title="前置字段">
                <span>前置字段</span>
                <b-input
                  v-model.trim="checkRules[index].preField"
                  size="small"
                  placeholder="前置字段"
                ></b-input>
              </div>
              <div class="title-box" title="前置字段值">
                <span>前置字段值</span>
                <b-input
                  v-model.trim="checkRules[index].preFieldValue"
                  size="small"
                  placeholder="前置字段值"
                ></b-input>
              </div>
            </template>
            <!--条件不为某值-->
            <template v-if="rule.name === RULE.conditionNotBe">
              <div class="title-box" title="前置字段">
                <span>前置字段</span>
                <b-input
                  v-model.trim="checkRules[index].preField"
                  size="small"
                  placeholder="前置字段"
                ></b-input>
              </div>
              <div class="title-box" title="前置字段值">
                <span>前置字段值</span>
                <b-input
                  v-model.trim="checkRules[index].preFieldValue"
                  size="small"
                  placeholder="前置字段值"
                ></b-input>
              </div>

              <div class="title-box" title="不是某值" style="width: 100%; flex: auto">
                <span>不是某值</span>
                <b-input
                  v-model.trim="checkRules[index].notValue"
                  size="small"
                  placeholder="不是某值"
                ></b-input>
              </div>
            </template>
            <!--值不能相同-->
            <template v-if="rule.name === RULE.notSame">
              <div class="title-box" title="前置字段">
                <span>前置字段</span>
                <b-input
                  v-model.trim="checkRules[index].preField"
                  size="small"
                  placeholder="前置字段"
                ></b-input>
              </div>
            </template>
            <!--日期区间-->
            <template v-if="rule.name === RULE.timeBound">
              <div class="title-box" title="比较模式">
                <span>比较模式</span>
                <b-select v-model="checkRules[index].compareMode" append-to-body size="small">
                  <b-option value="gt" label="&gt;"></b-option>
                  <b-option value="ge" label="&ge;"></b-option>
                  <b-option value="lt" label="&lt;"></b-option>
                  <b-option value="le" label="&le;"></b-option>
                </b-select>
              </div>
              <div class="title-box">
                <span title="比较值(yyyy-MM-dd)，可以是字段名，也可以填写$now取得当前时间">
                  比较取值
                </span>
                <b-input v-model.trim="checkRules[index].time" size="small"></b-input>
              </div>
            </template>

            <!-- 自定义（函数） -->
            <template v-if="rule.name === RULE.customFun && !rule.uploadRequired">
              <CustomScripts
                v-model="rule.funcBody"
                :arguments="rule.arguments"
                style="margin-bottom: 4px"
                :paramsDesc="paramsDesc"
                :exampleDesc="exampleDesc"
                label="脚本验证函数"
                funcExplain="通过提供的参数编写脚本，可以实现更灵活的表单校验。必须返回一个boolean值来标识是否通过校验。"
              />
            </template>
          </div>
          <div class="rules-message">
            <div class="title-box is-message" title="错误提示">
              <span>错误提示</span>
              <b-input
                v-model.trim="checkRules[index].message"
                size="small"
                placeholder="错误提示"
              ></b-input>
            </div>
          </div>
        </li>
      </template>
    </Draggable>

    <div style="height: 150px; padding: 30px 20px" v-if="checkRules.length === 0">
      <b-empty>当前无校验配置</b-empty>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  SIMPLE_RULE,
  MULTIPLE_RULE,
  RULE,
  RULE_NAME_MAP,
  TYPE_RULE,
} from '../../../core/utils/validator'
import { useRules } from './useRules'
import Draggable from 'vuedraggable'
import CustomScripts from '../../components/CustomScripts/index.vue'
import { useParamsDesc } from '../../hooks/useParamsDesc'
defineOptions({ name: 'ValidateCfg' })

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

const config = computed(() => data.value.config)

const { paramsDesc, exampleDesc } = useParamsDesc()

const { checkRules, requiredChange, setRules, removeRules, rulesClass, hasSameRule } =
  useRules(data)
</script>

<style scoped>
.rules-container {
  width: 100%;
  padding: 8px 0px;
  .top-control {
    width: 100%;
    line-height: 24px;
    padding: 0 12px;
  }

  .check-rules-wrap {
    width: 100%;
  }

  .rules-list-item {
    position: relative;
    background-color: #fff;
    border: 1px dashed #dcdfe6;
    padding: 4px 4px 0;
    margin: 10px 0px;
    .role-name {
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;
      width: 164px;
      color: #40a1ff;
      line-height: 24px;
      height: 24px;
      margin-bottom: 4px;
      cursor: move;
      &.is-required {
        color: #40a1ff;
      }
      &.is-multiple {
        color: #40a1ff;
      }
      .rules-title {
        padding: 0 10px;
        font-size: 12px;
        background: rgba(24, 144, 255, 0.05);
      }
    }
    .rules-params {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      > div {
        margin-right: 4px;
        &:nth-last-child(1) {
          margin-right: 0px;
        }
      }
    }
    .title-box {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      flex: 1;
      > span {
        border: 1px solid #dcdfe6;
        background: #f7f7f7;
        border-right: none;
        border-radius: 2px 0 0 2px;
        height: 28px;
        line-height: 26px;
        text-align: center;
        font-size: 12px;
        width: 65px;
        flex-shrink: 0;
        flex-grow: 0;
      }
      &.is-message {
        width: 100%;
      }
      :deep(.bin-input-number) {
        width: auto;
      }
      :deep(input.bin-input) {
        padding: 0 10px;
        font-size: 12px;
      }
    }
    .delete {
      width: 40px;
      text-align: right;
    }
  }

  .blue-background-class {
    position: relative;
    font-size: 0;
    border: 1px dashed var(--bin-color-primary) !important;
    z-index: 1;
    &::after {
      position: absolute;
      content: '';
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background: #fff !important;
      background-image: linear-gradient(
        var(--bin-color-primary-light5),
        var(--bin-color-primary-light3),
        var(--bin-color-primary-light5)
      ) !important;
    }
  }
  .drag-item-class {
    background: #fff !important;
    border: 1px solid var(--bin-color-primary) !important;
  }
}
</style>
