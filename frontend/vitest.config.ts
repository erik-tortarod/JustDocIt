import { defineConfig } from 'vitest/config'

export default defineConfig({
   test: {
      exclude: ['**/e2e/**', '**/node_modules/**'],
      include: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
   },
}) 