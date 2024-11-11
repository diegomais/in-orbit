import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import env from '@/config/env'
import * as schema from './schema'

export const client = postgres(env.DATABASE_URL)

export default drizzle({ client, schema, logger: env.DATABASE_LOGGING })
