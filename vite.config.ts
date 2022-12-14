import path from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['courier-inbox', 'courier-toast'].includes(tag)
        }
      }
    })
  ],
  define: {
    __VUE_OPTIONS_API__: false
  },
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CourierVueEmbedded',
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        },
        // Use `index.css` for css
        assetFileNames: assetInfo => {
          if (assetInfo.name == 'style.css') return 'index.css';
          return assetInfo.name;
        }
      }
    }
  }
});
