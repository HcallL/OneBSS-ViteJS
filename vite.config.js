import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2({
      jsx: true,
    }),
  ],

  envPrefix: ["VNPT",],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.vue', '.json', '.scss'],
  },
  build: {
    brotliSize: false, // unsupported in StackBlitz
    rollupOptions: {
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js'
    }
  },

  optimizeDeps: {
    include: ["select2"],
  },
})
