import { Utils } from 'bin-ui-design'
import dayjs from 'dayjs'

export const generateId = Utils.helper.generateId

export const uuid = Utils.util.uuid

export const logger = Utils.log

export const copyText = Utils.util.copy

export const typeOf = Utils.util.typeOf

export const deepCopy = Utils.util.deepCopy

export const deepMerge = Utils.util.deepMerge

export const isEqual = Utils.util.isEqual

export const isEmpty = Utils.helper.isEmpty

export const parseTime = Utils.util.parseTime

/**
 * 转换为json对象
 * @param data
 * @param defaultValue
 * @returns {any}
 */
export function toJson(data, defaultValue) {
  try {
    if (!data) {
      return defaultValue
    }
    if (typeOf(data) === 'string') {
      return JSON.parse(data)
    }
    return data
  } catch {
    return defaultValue
  }
}

// 字符串逗号分隔成数组
export function splitValue(value) {
  if (value !== null && value.length > 0) {
    return value.split(',')
  } else {
    return []
  }
}

export function joinValue(arr) {
  return arr.length ? arr.join(',') : ''
}

// 数组分割，按照个数分割
export function chunkArray(array, chunkSize) {
  let result = []
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }
  return result
}

/**
 * 日期比较函数
 * @param {string} currentVal 当前日期
 * @param {string} targetVal 目标日期
 * @param {string} mode 比较模式
 * @param {string} format 比较格式，必须，不然会存在问题
 * @param {string} log 是否打印比较值用于参考
 * @returns 返回是否满足
 */
export function dateCompare(currentVal, targetVal, mode, format = 'YYYY-MM-DD', log = false) {
  // 如果任意一个为空或者null，则标识判断不成立
  if (isEmpty(currentVal) || isEmpty(targetVal)) return false

  // 依次转换两种日期，保证是同一种输入的参数比较值
  const cTimte = new Date(currentVal.replace(/-/g, '/'))
  const tTimte = targetVal === '$now' ? new Date() : new Date(targetVal.replace(/-/g, '/'))

  const thisTime = dayjs(cTimte).format(format)
  const otherTime = dayjs(tTimte).format(format)

  if (log) {
    console.log('--------传入参数值--------')
    console.log(cTimte, tTimte)
    console.log('--------格式化参数值--------')
    console.log(thisTime, otherTime)
  }

  let result = true
  switch (mode) {
    case 'gt':
      result = thisTime > otherTime
      break
    case 'ge':
      result = thisTime >= otherTime
      break
    case 'lt':
      result = thisTime < otherTime
      break
    case 'le':
      result = thisTime <= otherTime
      break
    case 'eq':
      result = thisTime === otherTime
      break
  }
  return result
}
