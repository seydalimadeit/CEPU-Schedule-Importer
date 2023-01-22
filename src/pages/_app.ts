import type { App } from 'vue';

import vSelect from "vue-select";
import VueI18n from 'vue-i18n'

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

export default (app: App) => {
  app.component("FAIcon", FontAwesomeIcon)
  app.component("ComponentVSelect", vSelect)
  app.use(VueI18n)
}