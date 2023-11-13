import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const CWD = process.cwd()
const _root = CWD.replace(/\\/g, '/')

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/design-system-palette/' : '/',
  plugins: [
      vue(),
      svgLoader(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.scss', '.sass'],
    alias: [
      { find: '@', replacement: resolve(_root, 'src') },
      { find: /~(.+)/, replacement: resolve(CWD, 'node_modules/$1') }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@use "@/app/styles/vars.scss" as *; @use "@/app/styles/shared" as *;'
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        sanitizeFileName: name => `${name.replace('\x00', 'vite-').replace(/:/, '-')}`
      }
    }
  }
})
