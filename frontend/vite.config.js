import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['country-state-city'],
    },
  },
  resolve: {
    alias: {
        vue: "vue/dist/vue.esm-bundler.js",
        "@": path.resolve(__dirname, "./src"),
    },
  },
})