import { defineConfig, devices } from '@playwright/test';

/**
 * Cấu hình Playwright E2E cho PetMatch Client (Next.js)
 * - Tự động khởi chạy dev server tại http://localhost:3000 nếu chưa bật
 * - Chạy kiểm thử trên cả Desktop Chrome (1280x720) và Mobile Chrome (Pixel 5)
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000/home',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
