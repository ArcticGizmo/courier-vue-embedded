import { defineConfig } from 'cypress';
import { config } from 'dotenv';

config({ path: '.env.local' });
config();

export default defineConfig({
  env: { VITE_APP_CLIENT_KEY: process.env.VITE_APP_CLIENT_KEY },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
});
