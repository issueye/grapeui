import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    }
  },

  server: {
    proxy: {
      '/resources': {
        target: 'http://127.0.0.1:10065',
        rewrite: (path) => path.replace(/^\/resources/, "/resources")
      },
      '/page/api': {
        target: 'http://127.0.0.1:10065',
        rewrite: (path) => path.replace(/^\/api/, "/api")
      },
      '/api': {
        target: 'http://127.0.0.1:10065',
        rewrite: (path) => path.replace(/^\/api/, "/api")
      },
    },
  }
})
