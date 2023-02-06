import { getViteConfig } from 'astro/config';
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'

export default getViteConfig({
  plugins: [vue()],
	test: {
    globals: true,
    environment: 'happy-dom',
    include: [
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/test/**/*.{test,spec}.{js,ts}'
      )
    ],
  },
});