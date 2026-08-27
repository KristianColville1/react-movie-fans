import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const srcPath = (folder: string) =>
  fileURLToPath(new URL(`./src/${folder}`, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Keep in sync with `compilerOptions.paths` in tsconfig.json.
    alias: {
      '@api': srcPath('api'),
      '@assets': srcPath('assets'),
      '@components': srcPath('components'),
      '@atoms': srcPath('components/atoms'),
      '@molecules': srcPath('components/molecules'),
      '@organisms': srcPath('components/organisms'),
      '@templates': srcPath('components/templates'),
      '@contexts': srcPath('contexts'),
      '@hooks': srcPath('hooks'),
      '@images': srcPath('images'),
      '@pages': srcPath('pages'),
      '@stories': srcPath('stories'),
      '@storage': srcPath('storage'),
      '@tools': srcPath('tools'),
      '@typings': srcPath('types'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000
  }
})
