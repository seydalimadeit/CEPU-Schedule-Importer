import type { App } from 'vue';
import * as config from '@/config/config'

export default (app: App) => {
  config.initI18n(app)
  config.initFontAwesome(app)
  config.initCookies(app)
}