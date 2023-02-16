import { defineConfig } from 'astro/config';
import partytown from "@astrojs/partytown";
import node from '@astrojs/node';
import vue from "@astrojs/vue";

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: { 
    port: 3000,
    host: "0.0.0.0"
  },
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
    optimizeDeps: {
      exclude: [
        'fsevents',
      ],
    },
  },
});