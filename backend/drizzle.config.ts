import { defineConfig } from 'drizzle-kit'

import env from './src/config/env'

export default defineConfig({
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
  out: './.migrations',
  schema: './src/db/schema.ts',
})
