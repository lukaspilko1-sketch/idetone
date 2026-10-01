import { defineConfig, devices } from '@playwright/test';

// Testy běží proti vývojovému serveru (styleguide existuje jen v dev režimu).
export default defineConfig({
  testDir: 'tests',
  outputDir: 'test-results',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    reducedMotion: 'reduce',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
