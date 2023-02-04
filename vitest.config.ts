import { getViteConfig } from 'astro/config';
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

export default getViteConfig({
	test: {
    globals: true,
    include: [
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/test/**/*.{test,spec}.{js,ts}'
      )
    ],
  },
});