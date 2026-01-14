import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5500',
    supportFile: false, // desactiva el support file
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
