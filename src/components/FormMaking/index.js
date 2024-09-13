import { registerFormMaker } from './FormMaker/register'
import { registerFormGenerator } from './FormGenerator/register'

// 注册表单设计器，包含设计器和表单生成器
export function registerFormMaking(app) {
  registerFormMaker(app)
  registerFormGenerator(app)
}
