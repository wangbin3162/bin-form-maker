/**
 * 封装的请求信息，注意，这里需要根据自己定义的请求函数进行包装并引入
 */
import { fetchData } from '@/api/request'
import { unref, toRaw } from 'vue'
// 自定义的帮助函数
import * as helper from './utils'

function logRef(...params) {
  const p = params.map(item => toRaw(unref(item)))
  console.log(...p)
}

// 生成运行时可调用的函数，附加通用参数。
export function buildFun(funcBody, args) {
  const paramsStr = new Set([...args, 'fetchData', 'util'])
  const AsyncFunction = async function () {}.constructor
  const fun = new AsyncFunction(...paramsStr, funcBody)

  const util = {
    ...helper,
    logRef,
  }

  return async (...params) => {
    return await fun(...params, fetchData, util)
  }
}
