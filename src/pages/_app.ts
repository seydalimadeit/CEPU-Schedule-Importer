import type { App } from 'vue';

import vSelect from "vue-select";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCircleXmark,
  faCircleCheck,
  faTriangleExclamation
);

export default (app: App) => {
  app.component("FAIcon", FontAwesomeIcon)
  app.component("ComponentVSelect", vSelect);
}