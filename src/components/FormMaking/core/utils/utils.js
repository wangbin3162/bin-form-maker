import { Utils } from 'bin-ui-design'

export const generateId = Utils.helper.generateId

export const uuid = Utils.util.uuid

export const logger = Utils.log

export const copyText = Utils.util.copy

export const typeOf = Utils.util.typeOf

export const deepCopy = Utils.util.deepCopy

export const deepMerge = Utils.util.deepMerge

export const isEqual = Utils.util.isEqual

export const isEmpty = Utils.util.isEmpty

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
