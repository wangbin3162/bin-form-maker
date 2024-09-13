import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { registerUI } from '@/plugins/bin-ui-design'
import { registerEditor } from '@/plugins/bin-editor-next'
import { registerFormMaking } from '@/components/FormMaking/index'

import 'bin-ui-design/dist/styles/index.css'
import '@/assets/styles/index.css' // 项目样式

const app = createApp(App)
registerUI(app)
registerEditor(app)
setupRouter(app)
registerFormMaking(app)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
