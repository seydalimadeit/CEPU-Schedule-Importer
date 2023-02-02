import { createI18n } from 'vue-i18n';
import { App } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark, faCircleCheck, faTriangleExclamation, faPenToSquare, faTrash, faCircleChevronLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { VueCookieNext } from 'vue-cookie-next'

function loadLocaleMessages() {
  const locales = import.meta.glob<Record<string, string>>('../i18n/**/*.json', { eager: true })

  const messages = {}
  Object.keys(locales).forEach((lang: any) => {
    const matched = lang.match(/([A-Za-z0-9-_]+)\./i)
    const locale = matched.input.split('/')[2]

    if(!messages[locale]) {
      messages[locale] = {}
    }

    messages[locale] = Object.assign(messages[locale], locales[lang].default)
  })
  return messages
}

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  warnHtmlMessage: false,
  messages: loadLocaleMessages()
})

export const initI18n = (app: App) => {
  app.use(i18n)
}

export const initFontAwesome = (app: App) => {
  library.add(
    faCircleXmark,
    faCircleCheck,
    faTriangleExclamation,
    faPenToSquare,
    faTrash,
    faCircleChevronLeft,
    faCirclePlus
  );

  app.component("FAIcon", FontAwesomeIcon)
}

export const initCookies = (app: App) => {
  VueCookieNext.config({ 
    expire: '30d', 
  })
  
  app.use(VueCookieNext)
}