import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const srcPath = (folder: string) =>
  fileURLToPath(new URL(`./src/${folder}`, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Keep in sync with `compilerOptions.paths` in tsconfig.json.
    alias: {
      '@api': srcPath('api'),
      '@assets': srcPath('assets'),
      '@components': srcPath('components'),
      '@contexts': srcPath('contexts'),
      '@hooks': srcPath('hooks'),
      '@images': srcPath('images'),
      '@pages': srcPath('pages'),
      '@stories': srcPath('stories'),
      '@typings': srcPath('types'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000
  }
})
