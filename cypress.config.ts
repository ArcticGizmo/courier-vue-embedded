import { defineConfig } from 'cypress';
import { config } from 'dotenv';

config({path: '.env.local'});
config();

export default defineConfig({
  env: { CLIENT_KEY: process.env.CLIENT_KEY },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
});
