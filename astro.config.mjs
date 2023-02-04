import { defineConfig } from 'astro/config';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import partytown from "@astrojs/partytown";
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import node from '@astrojs/node';
import vue from "@astrojs/vue";

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    vue({
      appEntrypoint: '/src/pages/_app.ts'
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    plugins: [
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), '/src/i18n/**'),
      }),
    ],
  },
});