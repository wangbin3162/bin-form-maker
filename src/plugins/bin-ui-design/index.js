import BinUI from 'bin-ui-design'
// import config from '../../../package.json'  { Utils }

export function registerUI(app) {
  app.use(BinUI, { disabledDoc: true }) // ,{ disabledDoc: true }
  // Utils.log.printVersion(config.name, config.version, `【${config.description}】`)
}
