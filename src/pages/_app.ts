import type { App } from 'vue';

import vSelect from "vue-select";
import { createI18n } from 'vue-i18n'
import { VueCookieNext } from 'vue-cookie-next'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark, faCircleCheck, faTriangleExclamation, faPenToSquare, faTrash, faCircleChevronLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCircleXmark,
  faCircleCheck,
  faTriangleExclamation,
  faPenToSquare,
  faTrash,
  faCircleChevronLeft,
  faCirclePlus
);

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: 'msg'
    }
  },
})

VueCookieNext.config({ expire: '30d' })

export default (app: App) => {
  app.component("FAIcon", FontAwesomeIcon)
  app.component("ComponentVSelect", vSelect)
  app.use(i18n)
  app.use(VueCookieNext)
}