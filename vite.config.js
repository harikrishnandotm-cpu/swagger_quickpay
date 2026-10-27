const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/openapi.yaml': 'http://localhost:9000',
      '/health': 'http://localhost:9000'
    }
  }
});
