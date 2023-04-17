import { defineConfig } from 'cypress';
import registerCodeCoverageTasks  from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    codeCoverage: {
        exclude: "cypress/**/*.*",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config)
      return config
    },
    baseUrl: 'http://localhost:5000',
  },
  video: false,
  pageLoadTimeout: 200000,
})
