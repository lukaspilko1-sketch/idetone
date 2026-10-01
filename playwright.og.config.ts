import { defineConfig } from '@playwright/test';

// Generování OG obrázků (npm run og) – fotí dev stránky /og-nahled/[id]/ do public/og/.
export default defineConfig({
  testDir: 'tests',
  testMatch: 'og.gen.ts',
  reporter: 'list',
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'npm run dev -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
