import { defineConfig } from 'astro/config';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    vue({
      appEntrypoint: '/src/pages/_app.ts'
    }),
  ],
  vite: {
    plugins: [
      VueI18nPlugin({
        runtimeOnly: false,
        include: resolve(dirname(fileURLToPath(import.meta.url)), '/src/i18n/**'),
      }),
    ],
  },
});