import path from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';
import vueDevTools from 'vite-plugin-vue-devtools';

const fileName = {
  es: 'index.es.mjs',
  cjs: 'index.umd.cjs'
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['courier-inbox', 'courier-inbox-popup-menu', 'courier-toast'].includes(tag)
        }
      }
    }),
    dts({
      tsconfigPath: 'tsconfig.build.json'
    }),
    vueDevTools()
  ],
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CourierVueEmbedded',
      formats,
      fileName: format => fileName[format]
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name;
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  }
});
