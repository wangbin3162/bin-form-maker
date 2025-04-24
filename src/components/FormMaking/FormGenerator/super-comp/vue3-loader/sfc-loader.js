// sfcLoader.js - 支持字符串和远程SFC的加载器

import { loadModule } from 'vue3-sfc-loader'

/**
 * 初始化动态组件加载器
 * @param {Object} options 配置选项
 * @param {Object} options.vue Vue实例
 * @param {Object} [options.dependencies={}] 外部依赖
 * @returns {Object} 包含加载方法的对象
 */
export function initSfcLoader(options) {
  const { vue, dependencies = {} } = options

  /**
   * 从代码字符串加载组件
   * @param {String} code Vue单文件组件代码
   * @param {Object} [additionalDeps={}] 额外的依赖
   * @returns {Promise<{component: Component, error: string|null}>} 加载结果
   */
  const loadFromCode = async (code, additionalDeps = {}) => {
    try {
      cleanupStyles()
      // 使用随机文件名确保每次都是新鲜加载
      const fileName = `dynamic-${Math.random().toString(36).slice(2, 9)}.vue`

      const component = await loadModule(fileName, {
        moduleCache: {
          vue,
          ...dependencies,
          ...additionalDeps,
        },
        getFile: async url => {
          if (url === fileName) return code
          throw new Error(`File ${url} not found`)
        },
        addStyle,
      })
      return { component, error: null }
    } catch (error) {
      console.error('Failed to load component from code:', error)
      return { component: null, error: error.message }
    }
  }

  /**
   * 从远程URL加载组件
   * @param {String} url 远程SFC文件URL
   * @param {Object} [additionalDeps={}] 额外的依赖
   * @returns {Promise<{component: Component, error: string|null}>} 加载结果
   */
  const loadFromUrl = async (url, additionalDeps = {}) => {
    try {
      cleanupStyles()

      const component = await loadModule(url, {
        moduleCache: {
          vue,
          ...dependencies,
          ...additionalDeps,
        },
        getFile: async fileUrl => {
          const response = await fetch(fileUrl)
          if (!response.ok) throw new Error(`Failed to fetch ${fileUrl}`)
          return await response.text()
        },
        addStyle,
      })
      // 检查 loadModule 返回的 component 是否为空对象
      if (!component || Object.keys(component).length === 0) {
        throw new Error('Component is empty or invalid')
      }
      return { component, error: null }
    } catch (error) {
      console.error('Failed to load component from URL:', error)
      return { component: null, error: error.message }
    }
  }

  /**
   * 创建错误显示组件
   * @param {String} errorMessage 错误信息
   * @returns {Component} Vue错误组件
   */
  const createErrorComponent = errorMessage => ({
    template: `
      <div class="sfc-error">
        <h3>组件加载失败</h3>
        <pre>{{ error }}</pre>
      </div>
    `,
    setup() {
      return { error: errorMessage }
    },
  })

  const addStyle = textContent => {
    const style = document.createElement('style')
    style.textContent = textContent
    style.setAttribute('data-dynamic-component', 'true')
    document.head.appendChild(style)
  }

  // 清理之前添加的动态样式
  const cleanupStyles = () => {
    document.querySelectorAll('style[data-dynamic-component]').forEach(style => {
      if (style.isConnected) {
        // console.log('Removing dynamic style:', style)
        document.head.removeChild(style)
      }
    })
  }

  return {
    loadFromCode,
    loadFromUrl,
    createErrorComponent,
  }
}
